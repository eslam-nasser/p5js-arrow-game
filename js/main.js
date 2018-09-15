let player_one, player_two;
let floor;
let balls = [];
let ballDraggingCoords = [];
let showBallDragging = false;
let ballIsReleased = false;
let playerOneTurn = true;
let delta = 0;

function setup() {
    createCanvas(411, 731);
    angleMode(DEGREES);
    stroke(255);
    strokeWeight(4);
    floor = new Floor();

    let playersOffset = 100;
    player_one = new Player(playersOffset, height - floor.h - 40 / 2);
    player_two = new Player(width + playersOffset, height - floor.h - 40 / 2);

    // frameRate(1);
}

function draw() {
    background(55);

    translate(delta, 0);
    if (!playerOneTurn) {
        if (delta > -(width - 200)) {
            delta -= 10;
        }
    } else {
        if (delta < 0) {
            delta += 10;
        }
    }

    // Floor
    floor.show();

    // Player #1
    player_one.update();
    player_one.show(floor);

    // Player #2
    player_two.update();
    player_two.show(floor);

    if (showBallDragging && ballDraggingCoords.length === 2) {
        stroke(255);
        strokeWeight(2);
        line(
            ballDraggingCoords[0].x - delta,
            ballDraggingCoords[0].y,
            ballDraggingCoords[1].x - delta,
            ballDraggingCoords[1].y
        );
    }

    if (ballIsReleased) {
        let gravity = createVector(0, 0.2);
        balls.forEach(ball => {
            ball.applyForce(gravity);
            ball.update();
            ball.edges();
            ball.show();
        });
    }
}

// Handle the ball pull
function mousePressed() {
    showBallDragging = true;
    ballDraggingCoords[0] = {
        x: mouseX,
        y: mouseY
    };
}
function mouseDragged() {
    ballDraggingCoords[1] = {
        x: mouseX,
        y: mouseY
    };
}
function mouseReleased() {
    let ball = new Ball(
        ballDraggingCoords,
        playerOneTurn ? player_one : player_two,
        floor
    );
    playerOneTurn = !playerOneTurn;
    let angle = angleFromTwoPoints(
        ballDraggingCoords[0],
        ballDraggingCoords[1]
    );
    let vFromAngle = p5.Vector.fromAngle(angle);
    ball.shoot(vFromAngle);
    balls.push(ball);

    // Reset
    ballIsReleased = true;
    ballDraggingCoords = [];
    showBallDragging = false;
}

function angleFromTwoPoints(p1, p2) {
    return Math.atan2(p1.y - p2.y, p1.x - p2.x);
}

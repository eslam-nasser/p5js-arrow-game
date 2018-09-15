let player_one, player_two;
let floor;
let arrows = [];
let arrowDraggingCoords = [];
let showArrowDragging = false;
let arrowIsReleased = false;
let playerOneTurn = true;
let delta = 0;

function setup() {
    createCanvas(411, 731);
    angleMode(DEGREES);
    stroke(255);
    strokeWeight(4);
    floor = new Floor();
    player_one = new Player(50, height - floor.h - 40 / 2);
    player_two = new Player(width + 100, height - floor.h - 40 / 2);
}

function draw() {
    background(55);

    let cameraPosition = {
        x: playerOneTurn ? player_one.pos.x : player_one.pos.x,
        y: playerOneTurn ? player_two.pos.y : player_two.pos.y
    };
    // console.log(cameraPosition);

    // push();
    // translate(cameraPosition.x, cameraPosition.y);
    // translate(player_one.pos.x, player_one.pos.y);
    // translate(delta, 0);
    // fill(100);
    // ellipse(-10, -10, 10);
    // pop();

    // delta -= 1;

    // Floor
    floor.show();

    // Player #1
    player_one.update();
    player_one.show(floor);

    // Player #2
    player_two.update();
    player_two.show(floor);

    if (showArrowDragging && arrowDraggingCoords.length === 2) {
        stroke(255);
        strokeWeight(2);
        line(
            arrowDraggingCoords[0].x,
            arrowDraggingCoords[0].y,
            arrowDraggingCoords[1].x,
            arrowDraggingCoords[1].y
        );
    }

    if (arrowIsReleased) {
        let gravity = createVector(0, 0.2);
        arrows.forEach(arrow => {
            arrow.applyForce(gravity);
            arrow.update();
            arrow.edges();
            arrow.show();
        });
    }
}

// Handle the arrow pull
function mousePressed() {
    showArrowDragging = true;
    arrowDraggingCoords[0] = {
        x: mouseX,
        y: mouseY
    };
}
function mouseDragged() {
    arrowDraggingCoords[1] = {
        x: mouseX,
        y: mouseY
    };
}
function mouseReleased() {
    let arrow = new Arrow(
        arrowDraggingCoords,
        playerOneTurn ? player_one : player_two,
        floor
    );
    playerOneTurn = !playerOneTurn;
    let angle = angleFromTwoPoints(
        arrowDraggingCoords[0],
        arrowDraggingCoords[1]
    );
    let vFromAngle = p5.Vector.fromAngle(angle);
    arrow.shoot(vFromAngle);
    arrows.push(arrow);

    // Reset
    arrowIsReleased = true;
    arrowDraggingCoords = [];
    showArrowDragging = false;
}

function angleFromTwoPoints(p1, p2) {
    return Math.atan2(p1.y - p2.y, p1.x - p2.x);
}

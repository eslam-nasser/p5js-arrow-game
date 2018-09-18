let player_one, player_two, floor;
let arrows = [];
let playerOneArrows = [];
let playerTwoArrows = [];
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

    let playersOffset = 100;
    player_one = new Player(playersOffset, height - floor.h - 40 / 2);
    player_two = new Player(width + playersOffset, height - floor.h - 40 / 2);
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
    player_one.show();

    // Player #2
    player_two.show();

    if (showArrowDragging && arrowDraggingCoords.length === 2) {
        stroke(255);
        strokeWeight(1);
        line(
            arrowDraggingCoords[0].x - delta,
            arrowDraggingCoords[0].y,
            arrowDraggingCoords[1].x - delta,
            arrowDraggingCoords[1].y
        );
    }

    let gravity = createVector(0, 0.2);
    if (arrowIsReleased) {
        for (let i = arrows.length - 1; i >= 0; i--) {
            let arrow = arrows[i];

            if (!arrow.scrored) {
                arrow.applyForce(gravity);
                arrow.update();
                arrow.edges(floor);
                arrow.show();
            }

            if (arrow.hits(playerOneTurn ? player_one : player_two)) {
                arrow.intersected = true;
                arrow.landed = true;
                if (!playerOneTurn && !arrow.scrored) {
                    playerOneArrows.push(copyInstance(arrow));
                } else if (playerOneTurn && !arrow.scrored) {
                    playerTwoArrows.push(copyInstance(arrow));
                }
                arrow.scrored = true;
            }
        }
    }
    // Delete the oldest arrow if there is too many arrows
    if (arrows.length > 10) {
        arrows.splice(0, 1);
    }

    // Show the scored arrows so that they don't disappear
    playerOneArrows.forEach(arrow => {
        arrow.applyForce(gravity);
        arrow.update();
        arrow.edges(floor);
        arrow.show();
    });
    playerTwoArrows.forEach(arrow => {
        arrow.applyForce(gravity);
        arrow.update();
        arrow.edges(floor);
        arrow.show();
    });

    // Show score
    textSize(12);
    fill(255);
    text(
        `Player one: ${playerOneArrows.length}`,
        player_one.pos.x,
        player_one.pos.y + player_one.h + 15
    );
    text(
        `Player two: ${playerTwoArrows.length}`,
        player_two.pos.x,
        player_two.pos.y + player_two.h + 15
    );
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
    let angle =
        arrowDraggingCoords.length === 2
            ? angleFromTwoPoints(arrowDraggingCoords[0], arrowDraggingCoords[1])
            : 0;
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

function copyInstance(original) {
    var copied = Object.assign(
        Object.create(Object.getPrototypeOf(original)),
        original
    );
    return copied;
}

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
    stroke(255);
    floor = new Floor();

    let playersOffset = 100;
    player_one = new Player(playersOffset, height - floor.h - 40 / 2);
    player_two = new Player(width + playersOffset, height - floor.h - 40 / 2);
}

function draw() {
    background(55);

    // Move the "Camera" by translating the whole scene
    translate(delta, 0);

    // Show score
    textSize(32);
    textAlign(CENTER);
    fill(255);
    noStroke();
    // Big numbers
    text(`${playerOneArrows.length}`, 50 - delta, 50);
    text(`${playerTwoArrows.length}`, width - 50 - delta, 50);
    // Players names
    textSize(13);
    text(`Player #1`, 50 - delta, 75);
    text(`Player #2`, width - 50 - delta, 75);

    // Increasing delta
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

    // If the user is dragging the mouse we need to draw the line that represent the arrow's angle and magnitude
    if (showArrowDragging && arrowDraggingCoords.length === 2) {
        stroke(255);
        line(
            arrowDraggingCoords[0].x - delta,
            arrowDraggingCoords[0].y,
            arrowDraggingCoords[1].x - delta,
            arrowDraggingCoords[1].y
        );
    }

    // Create gravity force
    let gravity = createVector(0, 0.2);
    if (arrowIsReleased) {
        for (let i = arrows.length - 1; i >= 0; i--) {
            let arrow = arrows[i];

            if (!arrow.scored) {
                arrow.applyForce(gravity);
                arrow.update();
                arrow.edges(floor);
                arrow.show();
            }

            // If an arrow hits the opposite side
            if (arrow.hits(playerOneTurn ? player_one : player_two)) {
                arrow.intersected = true; // check this arrow as intersected so we can change its color
                arrow.landed = true; // check this arrow as landed so it can stop moving

                // If we didn't check this arrow as scored and its player two turn
                if (!playerOneTurn && !arrow.scored) {
                    playerOneArrows.push(copyInstance(arrow));
                }
                // If we didn't check this arrow as scored and its player one turn
                if (playerOneTurn && !arrow.scored) {
                    playerTwoArrows.push(copyInstance(arrow));
                }
                // check this arrow as scored so we don't count it multiple times
                arrow.scored = true;
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
    // After the user drag and release we will create a new arrow with the dragging details
    let arrow = new Arrow(
        arrowDraggingCoords,
        playerOneTurn ? player_one : player_two,
        floor
    );
    // Pass the turn the other player
    playerOneTurn = !playerOneTurn;
    // We get the angle of the user's dragging coords
    let angle =
        arrowDraggingCoords.length === 2
            ? angleFromTwoPoints(arrowDraggingCoords[0], arrowDraggingCoords[1])
            : 0;
    // Create a Vector from this angle, this vector represent the arrow's force
    let vFromAngle = p5.Vector.fromAngle(angle);
    // Apply this force to the arrow
    arrow.shoot(vFromAngle);
    // Add this arrow to the rest of the old arrows
    arrows.push(arrow);

    // Reset the dragging values
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

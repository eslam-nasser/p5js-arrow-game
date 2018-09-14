let player_one, player_two;
let floor;
let arrow;

function setup() {
    createCanvas(411, 731);
    stroke(255);
    strokeWeight(4);
    player_one = new Player(50);
    player_two = new Player(width - 50);
    floor = new Floor(200);
}

function draw() {
    background(55);

    // Floor
    floor.show();

    // Player #1
    player_one.update();
    player_one.show(floor);

    // Player #2
    player_two.update();
    player_two.show(floor);
}

class Arrow {
    constructor(coords, player, floor) {
        this.r = 5;
        this.player = player;
        this.floor = floor;
        // Copy the player that shot the arrow so we can start the arrow from the player's position
        let playerPos = player.pos.copy();
        this.pos = createVector(playerPos.x, playerPos.y);
        this.acc = createVector();
        this.vel = createVector();
        // Get the length of the user's dragged arrow
        this.mag =
            coords.length === 2
                ? dist(coords[0].x, coords[0].y, coords[1].x, coords[1].y)
                : 1;
        this.landed = false;
        this.intersected = false;
        this.scored = false;
    }

    update() {
        // Only apply forces to the arrow if it didn't land on something
        if (!this.landed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    }

    // Apply the shooting force to the arrow
    shoot(f) {
        // Multiply the shooting force by the length of the user's dragged arrow
        f.mult(this.mag);
        // Limit how much force can by applied to the arrow
        f.limit(12);
        // Apply the shooting force to the arrow
        this.applyForce(f);
    }

    // Check if the arrow hits the given player
    hits(player) {
        if (
            // check x axis
            this.pos.x > player.pos.x &&
            this.pos.x < player.pos.x + player.w &&
            // check y axis
            this.pos.y > player.pos.y &&
            this.pos.y < player.pos.y + player.h
        ) {
            return true;
        }
        return false;
    }

    // General function that apply a given force to this object
    applyForce(f) {
        this.acc.add(f);
    }

    // Render the arrow to the screen
    show() {
        noStroke();
        fill(255);
        // We will paint the arrow red if it hits "intersected" with one of the players
        if (this.landed && this.intersected) fill(255, 0, 0);
        // We will reduce the alpha of the arrow if it hits the floor
        if (this.landed && !this.intersected) fill(255, 50);
        push();
        translate(this.pos.x, this.pos.y);
        // Rotate the arrow by the velocity's angle
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, this.r * 4, this.r * 0.5);
        // The arrow's tip
        triangle(
            (this.r * 2) / 2,
            (-this.r * 2) / 2,

            (this.r * 2) / 2,
            (this.r * 2) / 2,

            this.r * 2,
            0
        );
        pop();
    }

    // Check if the arrow hits the floor
    edges(floor) {
        if (this.pos.y > height - floor.h - this.r / 2) {
            // If it does hits the floor, check it as landed
            this.landed = true;
        }
    }
}

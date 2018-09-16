class Ball {
    constructor(coords, player, floor) {
        this.r = 10;
        this.player = player;
        this.floor = floor;
        let playerPos = player.pos.copy();
        this.pos = createVector(playerPos.x, playerPos.y);
        this.acc = createVector();
        this.vel = createVector();
        this.mag = dist(coords[0].x, coords[0].y, coords[1].x, coords[1].y);
        this.landed = false;
        this.intersected = false;
    }

    update() {
        if (!this.landed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    }

    shoot(f) {
        f.mult(this.mag / 20);
        f.limit(12);
        this.applyForce(f);
    }

    hits(player) {
        // console.log(player);

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

    applyForce(f) {
        this.acc.add(f);
    }

    show() {
        noStroke();
        fill(255);
        if (this.landed && this.intersected) fill(255, 0, 0);
        if (this.landed && !this.intersected) fill(255, 50);
        ellipse(this.pos.x, this.pos.y, this.r);
    }

    edges(floor) {
        if (this.pos.y > height - floor.h - this.r / 2) {
            this.landed = true;
        }
    }
}

class Arrow {
    constructor(coords, player, floor) {
        this.player = player;
        this.floor = floor;
        this.pos = createVector();
        this.acc = createVector();
        this.vel = createVector();
        this.mag = dist(coords[0].x, coords[0].y, coords[1].x, coords[1].y);
        this.landed = false;
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
        this.applyForce(f);
    }

    applyForce(f) {
        this.acc.add(f);
    }

    show() {
        push();
        noStroke();
        fill(200);
        translate(this.player.pos.x, height - 200 - this.player.h / 2);
        ellipse(this.pos.x, this.pos.y, 10);
        pop();
    }

    edges() {
        if (this.pos.y > 0 + this.player.h / 2) {
            this.landed = true;
        }
    }
}

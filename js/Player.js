class Player {
    constructor(x, y, w = 20, h = 40) {
        this.w = w;
        this.h = h;
        this.pos = createVector(x, y);
    }

    show(floor) {
        push();
        fill(255);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        pop();
    }

    update() {
        // this.vel.add(this.acc);
        // this.pos.add(this.vel);
        // this.acc.set(0, 0);
    }

    applyForce(f) {
        this.acc.add(f);
    }

    strictWalls() {
        // Floor
        if (this.pos.y >= height) {
            this.vel.y = 0;
            this.pos.y = height;
            this.allowToJumb = true;
        }
    }
}

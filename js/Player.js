class Player {
    constructor(x, w = 20, h = 40) {
        this.w = w;
        this.h = h;
        this.location = createVector(x, 0);
    }

    show(floor) {
        push();
        fill(255);
        rectMode(CENTER);
        rect(this.location.x, height - floor.h - this.h / 2, this.w, this.h);
        pop();
    }

    update() {
        // this.vel.add(this.acc);
        // this.location.add(this.vel);
        // this.acc.set(0, 0);
    }

    applyForce(f) {
        this.acc.add(f);
    }

    strictWalls() {
        // Floor
        if (this.location.y >= height) {
            this.vel.y = 0;
            this.location.y = height;
            this.allowToJumb = true;
        }
    }
}

class Arrow {
    constructor(x, y, isItPartOfExplosion) {
        this.pos = createVector(x, y);
        this.partOfExplosion = isItPartOfExplosion;
        this.lifeSpan = 255;
        if (isItPartOfExplosion) {
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(1, 2));
        } else {
            this.vel = createVector(0, random(-8, -14));
        }
        this.acc = createVector();
    }

    update() {
        if (!this.partOfExplosion) {
            this.vel.mult(1);
            this.lifeSpan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(f) {
        this.acc.add(f);
    }

    show() {
        if (!this.partOfExplosion) {
            strokeWeight(2);
            stroke(255, this.lifeSpan);
        } else {
            strokeWeight(4);
            stroke(255);
        }
        point(this.pos.x, this.pos.y);
    }
}

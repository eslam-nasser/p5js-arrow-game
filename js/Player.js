class Player {
    constructor(x, y, w = 20, h = 40) {
        this.w = w;
        this.h = h;
        this.pos = createVector(x, y - this.h / 2);
    }

    show() {
        push();
        fill(255);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        pop();
    }
}

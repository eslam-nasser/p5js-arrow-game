class Player {
    constructor(x, y, w = 20, h = 40) {
        this.w = w;
        this.h = h;
        // We offset the player by half of his height so he can be correctly be rendered just above the floor
        this.pos = createVector(x, y - this.h / 2);
    }

    // Render the player
    show() {
        push();
        fill(255);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        pop();
    }
}

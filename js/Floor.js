class Floor {
    constructor() {
        this.h = 200;
    }

    // Render the floor
    show() {
        fill(45);
        noStroke();
        rect(0, height - this.h, width * 2, height);
    }
}

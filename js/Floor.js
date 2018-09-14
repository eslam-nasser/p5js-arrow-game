class Floor {
    constructor(height) {
        this.h = height;
    }

    show() {
        fill(45);
        noStroke();
        rect(0, height - this.h, width, height);
    }
}

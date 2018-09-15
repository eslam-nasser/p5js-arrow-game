class Floor {
    constructor() {
        this.h = 200;
    }

    show() {
        fill(45);
        noStroke();
        rect(0, height - this.h, width, height);
    }
}

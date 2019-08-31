class Plane {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        pen.drawImage(media.plane, this.x, this.y, this.w, this.h);
    }
}
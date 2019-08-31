class Asteroid {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        this.x -= 3;
        pen.drawImage(media.asteroid, this.x, this.y, this.w, this.h);
    }
}
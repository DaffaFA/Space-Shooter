class PowerUp {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        this.y += 2;
        pen.drawImage(media.powerUp, this.x, this.y, this.w, this.h);
    }
}
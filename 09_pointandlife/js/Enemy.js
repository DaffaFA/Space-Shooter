class Enemy {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        this.x -= 2;
        pen.drawImage(media.enemy, this.x, this.y, this.w, this.h);
    }
}
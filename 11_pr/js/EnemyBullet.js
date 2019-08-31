class EnemyBullet {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        this.x -= 8;
        pen.drawImage(media.enemyBullet, this.x, this.y, this.w, this.h);
    }
}
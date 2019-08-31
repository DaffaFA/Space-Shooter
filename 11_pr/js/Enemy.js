class Enemy {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.enemyBullets = [];
    }

    draw() {
        this.x -= 5;
        this.y -= 0.5;
        pen.drawImage(media.enemy, this.x, this.y, this.w, this.h);
    }

    shoot() {
        this.enemyBullets.push(new EnemyBullet(this.x + this.w, this.y + this.h / 2, this.w, this.h));
        setTimeout(() => this.shoot(), 500);
    }
}
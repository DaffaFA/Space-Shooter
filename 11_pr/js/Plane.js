class Plane {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.moving = false;
        this.bullets = [];
    }

    draw() {
        pen.drawImage(media.plane, this.x, this.y, this.w, this.h);
        this.bullets.forEach(bullet => {
            bullet.draw();
        })
    }

    moveUp() {
        if (this.moving) {
            game.animate(() => this.moveUp())
            
            if (this.y - 8 <= 0) {
                this.y = 0 
            } else {
                this.y -= 8;
            }
        }
    }

    moveDown() {
        if (this.moving) {
            game.animate(() => this.moveDown())
            if (this.y + this.h + 8 >= ch) {
                this.y = ch - this.h; 
            } else {
                this.y += 8;
            }
        }
    }

    shot() {
        this.bullets.push(new Bullet(this.x + this.w, this.y + this.h / 2, 30, 10));
    }
}
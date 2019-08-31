class Game {
    constructor() {
        this.bg = {
            x: 0,
            y: 0,
            w: 1920,
            h: 600
        }

        this.plane = null;
        this.asteroids = []; 
        this.enemies = [];
        this.bullets = [];
    }

    animate(callback) {
        window.requestAnimationFrame(callback);
    }

    run() {
        this.generate();
        this.start();

        //Audio start
        this.playAudio();
    }

    generate() {
        this.plane = new Plane(10, ch/2 - 50, 100, 100);

        this.generateAsteroid();
        this.generateEnemies();
        // this.generateBullets();
    }
    
    // generateBullets() {
    //     document.body.onkeyup = (e) => {
    //         if(e.keyCode == 32){
    //             console.log(this.bullets);
    //         }
    //         }            
    //         this.bullets.push(new Bullet(10, ch/2 - 5 , 30, 10));
    //         setTimeout(() => this.generateBullets(), 400)
            
    // }

    generateAsteroid() {
        let randomY = Math.abs(Math.floor(Math.random() * ch));

        this.asteroids.push(new Asteroid(cw, randomY, 70, 70));
        setTimeout(() => this.generateAsteroid(), 3000);
    }


    generateEnemies() {
        let randomY = Math.abs(Math.floor(Math.random() * ch));

        this.enemies.push(new Enemy(cw, randomY, 100, 100));
        setTimeout(() => this.generateEnemies(), 6000);
    }


    start() {
        this.animate(() => this.start());
        cw = canvas.width = 960;
        ch = canvas.height = 600;
        pen.clearRect(0, 0, cw, ch);

        this.draw();
        this.update();
    }

    draw() {
        this.drawBackground();

        this.bullets.forEach(bullet => {
            bullet.draw();
        })
        this.plane.draw();
        
        this.asteroids.forEach(asteroid => {
            asteroid.draw();
        });
        
        this.enemies.forEach(enemy => {
            enemy.draw();
        });

    }

    drawBackground() {
        this.bg.x -= 6;

        if (this.bg.x + this.bg.w <= cw) {
            this.bg.x = 0;
        }

        pen.drawImage(media.bg, this.bg.x, this.bg.y, this.bg.w, this.bg.h);
    }


    // fun update untuk handler jika data berubah
    update() {

    }

    playAudio() {
        setTimeout(() => {
            media.bgAudio.play();
        }, 1000);
    }
}
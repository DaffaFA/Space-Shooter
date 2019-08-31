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

        this.points = 0;
        this.nyawa = 5;
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
        this.plane = new Plane(10, ch / 2 - 50, 100, 100);

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

        this.drawHUT();

    }

    drawHUT() {
        
        // Menggambar Point
        pen.fillStyle = '#FFFFFF';
        pen.font = "24px KenVector Future";
        pen.textBaselie = 'middle';
        pen.textAlign = 'left'

        pen.fillText('Point: ' + this.points, 20, 20);

        //Menggambar Nyawa
        pen.fillStyle = '#FFFFFF';
        pen.font = "24px KenVector Future";
        pen.textBaselie = 'middle';
        pen.textAlign = 'right'
        pen.fillText('Nyawa: ' + this.nyawa, cw-20, 20);

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

        //bullet collide asteroid 
        this.plane.bullets.forEach((bullet, i) => {
            // collide fun
            this.asteroids.forEach((asteroid, i2) => {
                this.collide(bullet, asteroid, () => {
                    this.plane.bullets.splice(i, 1);
                    this.asteroids.splice(i2, 1);


                    this.points += 15;
                })
            })
        })
        //plane collide asteroid
        this.asteroids.forEach((asteroid, i) => {
            this.collide(this.plane, asteroid, () => {
                this.asteroids.splice(i, 1);
                this.nyawa -= 1;
            })
        })

        if(this.nyawa <= 0) {
            this.over();
        }
        
    }

    over() {
        alert('game over');
    }

    collide(obj1, obj2, callback) {
        if (obj1.x + obj1.w > obj2.x &&
            obj1.x < obj2.x + obj2.w &&
            obj1.y + obj1.h > obj2.y &&
            obj1.y < obj2.y + obj2.h
        ) {
            callback();
        }
    }

    playAudio() {
        setTimeout(() => {
            media.bgAudio.play();
        }, 1000);
    }
}
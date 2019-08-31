class Game {
    constructor() {
        this.state = 'intro';

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
        this.enemyBullets = [];
        this.powerUps = [];

        this.points = 0;
        this.life = 5;
        this.highscore = 0;
    }

    animate(callback) {
        window.requestAnimationFrame(callback);
    }

    run() {
        this.start();

        //Audio start
        this.playAudio();
    }

    generate() {
        this.plane = new Plane(30, ch / 2 - 50, 100, 100);

        this.generateAsteroid();
        this.generateEnemies();
        this.generatePowerUp();
        // this.generateEnemyBullet();
    }

    // generateEnemyBullets(bullet) {
    //     enemy.shoot();
    // }

    generatePowerUp() {
        let randomX = Math.abs(Math.floor(Math.random() * cw) + cw / 2);

        this.powerUps.push(new PowerUp(randomX, 0, 50, 50));
        setTimeout(() => this.generatePowerUp(), 10000);
    }

    // generateEnemyBullet(x, y, w, h) {
    //     this.enemies.forEach((enemy) => {
    //         enemy.enemyBullets.forEach((enemyBullet) => {
    //             enemyBullet.push(new EnemyBullet(x + w, y + h / 2, w, h))
    //         })
    //     });
    //     this.enemyBullets.push(new EnemyBullet(this.x + this.w, this.y + this.h / 2, this.w, this.h));


    //     setTimeout(() => this.generateEnemyBullet(), 1000);
    // }

    generateAsteroid() {
        let randomY = Math.abs(Math.floor(Math.random() * ch));

        this.asteroids.push(new Asteroid(cw, randomY, 70, 70));
        setTimeout(() => this.generateAsteroid(), 3000);
    }

    generateThisBullet() {
        this.enemies.forEach(enemy => {
            this.enemyBullets.push(new EnemyBullet(enemy.x, enemy.y + enemy.h / 2 - 15, 30, 30));
        });
        setTimeout(() => this.generateThisBullet(), 1000);
    }

    generateEnemies() {
        let randomY = Math.abs(Math.floor(Math.random() * ch));
        this.enemies.push(new Enemy(cw, randomY, 100, 100));


        this.generateThisBullet();
        setTimeout(() => this.generateEnemies(), 3000);
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
        if (this.state == 'intro') {
            this.drawBackground();
            this.drawScore();
            this.drawBtnStart();
        } else if (this.state == 'gameplay') {
            this.drawBackground();
            this.bullets.forEach(bullet => {
                bullet.draw();
            });
            this.plane.draw();
            this.asteroids.forEach(asteroid => {
                asteroid.draw();
            });
            this.enemies.forEach(enemy => {
                enemy.draw();
            });
            this.powerUps.forEach(powerUp => {
                powerUp.draw();
            });
            this.enemyBullets.forEach(enemyBullet => {
                enemyBullet.draw();
            });
            this.drawHUD();
        }

    }

    drawScore() {
        pen.fillStyle = '#FFFFFF';
        pen.font = "24px KenVector Future";
        pen.textAlign = 'center';
        pen.textBaseline = 'middle';

        let hs = localStorage.highscore ? localStorage.highscore : 0;
        let name = localStorage.name ? localStorage.name : 'Mr. X'

        pen.fillText('Highscore: ', cw / 2, ch / 4);
        pen.fillText(name + ' = ' + hs, cw / 2, ch / 4 + 50);
    }

    drawBtnStart() {
        pen.beginPath();
        pen.strokeStyle = '#FFFFFF';
        pen.rect(cw / 2 - 250 / 2, ch / 2 - 20, 250, 50);
        pen.stroke();

        pen.fillStyle = '#FFFFFF';
        pen.font = "24px KenVector Future";
        pen.textAlign = 'center';
        pen.textBaseline = 'middle';
        pen.fillText('Start Game', cw / 2, ch / 2);
    }


    drawHUD() {

        // Menggambar Point
        pen.fillStyle = '#FFFFFF';
        pen.font = "24px KenVector Future";
        pen.textBaselie = 'middle';
        pen.textAlign = 'left'

        pen.fillText('Point: ' + this.points, 20, 20);

        //Menggambar life
        pen.fillStyle = '#FFFFFF';
        pen.font = "24px KenVector Future";
        pen.textBaselie = 'middle';
        pen.textAlign = 'right'
        pen.fillText('life: ' + this.life, cw - 20, 20);

    }

    drawBackground() {
        this.bg.x -= 3;

        if (this.bg.x + this.bg.w <= cw) {
            this.bg.x = 0;
        }

        pen.drawImage(media.bg, this.bg.x, this.bg.y, this.bg.w, this.bg.h);
    }


    // fun update untuk handler jika data berubah
    update() {
        if (this.plane != null) {

            this.plane.bullets.forEach((bullet, i) => {
                this.asteroids.forEach((asteroid, i2) => {
                    this.collide(bullet, asteroid, () => {
                        this.plane.bullets.splice(i, 1);
                        this.asteroids.splice(i2, 1);


                        this.points += 15;
                    })
                })
            })

            this.plane.bullets.forEach((bullet, i) => {
                this.enemies.forEach((enemy, i2) => {
                    this.collide(bullet, enemy, () => {
                        this.plane.bullets.splice(i, 1);
                        this.enemies.splice(i2, 1);


                        this.points += 30;
                    })
                })
            })

            this.plane.bullets.forEach((bullet, i) => {
                this.powerUps.forEach((powerUp, i2) => {
                    this.collide(bullet, powerUp, () => {
                        this.plane.bullets.splice(i, 1);
                        this.powerUps.splice(i2, 1);

                        if (this.life < 5) {
                            this.life += 1;
                        } else if (this.life >= 5) {
                            this.life = 5;

                        } else if (this.life < 1) {
                            this.over();
                        }
                    })
                })
            })

            //bullet collide asteroid 
            //plane collide asteroid
            this.asteroids.forEach((asteroid, i) => {
                this.collide(this.plane, asteroid, () => {
                    this.asteroids.splice(i, 1);
                    this.life -= 1;
                    if (this.life == 0) {
                        this.over();
                    }
                })
            })

            this.enemyBullets.forEach((enemyBullet, i) => {
                this.collide(this.plane, enemyBullet, () => {
                    this.enemyBullets.splice(i, 1);
                    this.life -= 1;
                    if (this.life == 0) {
                        this.over();
                    }
                })
            })

            this.enemies.forEach((enemy, i) => {
                this.collide(this.plane, enemy, () => {
                    this.enemies.splice(i, 1);
                    this.life -= 1;
                    if (this.life == 0) {
                        this.over();
                    }
                })
            })

            this.plane.bullets.forEach((bullet, i) => {
                this.enemyBullets.forEach((enemyBullet, i2) => {
                    this.collide(bullet, enemyBullet, () => {
                        this.plane.bullets.splice(i, 1);
                        this.enemyBullets.splice(i2, 1);
                    })
                })
            })
        }
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

    over() {
        let name = prompt("Please enter your name");
        if (this.points > this.highscore) {
            localStorage.setItem('highscore', this.points);
            localStorage.setItem('name', name);
        };

        // this.resetProperties();
        alert("Game Over");
        this.state = 'intro';
    }

    resetProperties() {
        this.plane = null;
        this.asteroids = [];
        this.enemies = [];
        this.bullets = [];
        this.enemyBullets = [];
        this.powerUps = [];

        this.points = 0;
        this.life = 5;
        // this.highscore = 0;

    }

    clicked(x, y) {
        let btn = {
            x: cw / 2 - 250 / 2,
            y: ch / 2 - 65 / 2,
            w: 250,
            h: 65
        }
        this.pointerEnter(x, y, btn, () => {
            this.state = 'gameplay';
            this.generate();
        })
    };

    pointerEnter(x, y, obj, callback) {
        if (
            x > obj.x &&
            x < obj.x + obj.w &&
            y > obj.y &&
            y < obj.y + obj.h
        ) {
            callback();
        }
    }


}
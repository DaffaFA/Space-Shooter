class Game {
    constructor() {
        this.bg = {
            x: 0,
            y: 0,
            w: 1920,
            h: 600
        }
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
        pen.drawImage(media.plane, 50, ch / 2 - 50, 50, 50);

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
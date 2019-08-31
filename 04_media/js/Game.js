class Game {
    constructor() {

    }

    animate (callback) {
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
        pen.drawImage(media.plane, 50, ch/2 - 50, 100, 100);
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
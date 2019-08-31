class Game {
    constructor() {

    }

    animate(callback) {
        window.requestAnimationFrame(callback);
    }

    run() {
        this.generate();
        this.start();
    }

    generate() {

    }

    start() {
        this.animate(() => this.animate());
        pen.clearRect(0, 0, cw, ch);

        this.draw();
        this.update();
    }

    draw() {

    }


    // fun update untuk handler jika data berubah
    update() {

    }
}
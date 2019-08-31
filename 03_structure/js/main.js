window.onload = init();

function init() {
    setCanvas();

    //run game
    game = new Game();
    game.run();
}

function setCanvas() {
    canvas = document.getElementById('canvas');

    pen = canvas.getContext('2d');
}
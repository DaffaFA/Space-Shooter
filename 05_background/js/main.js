window.onload = init();

function init() {
    setCanvas();
    setMedia();

    //run game
    game = new Game();
    game.run();
}

function setCanvas() {
    canvas = document.getElementById('canvas');
    cw = canvas.width = 960;
    ch = canvas.height = 600;


    pen = canvas.getContext('2d');
}

function setMedia() {
    media = {};

    media.plane = new Image();
    media.plane.src = 'source/PNG/plane.png';

    media.bgAudio = new Audio();
    media.bgAudio.src = 'source/Bonus/sfx_laser1.ogg';

    media.bg = new Image();
    media.bg.src = 'source/PNG/background.png';
}
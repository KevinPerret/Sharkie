let canvas;
let world;
let keyboard = new Keyboard();
let backgroundSound;
let gameStarted = false;
let sound = new Sound();
let firstContact = false;
let intervals = [];
let gameover = false;
let win = false;

function toggleGameOverScreen(win) {
    document.getElementById('gameOverScreen').classList.toggle('dNone');
    win ? document.getElementById('finalImage').src = "img/6.Botones/Tittles/You win/Recurso 19.png" : document.getElementById('finalImage').src = "img/6.Botones/Tittles/Game Over/Recurso 10.png"

}

function addInterval(interval) {
    intervals.push(interval);
}

function stopAllIntervals() {
    intervals.forEach(interval => clearInterval(interval));
    intervals = [];
}


window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        keyboard.SPACE = true;
        e.preventDefault();
    }
    if (e.code === "ArrowUp") {
        keyboard.UP = true;
    }
    if (e.code === "ArrowDown") {
        keyboard.DOWN = true;
    }
    if (e.code === "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (e.code === "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (e.code === "KeyD") {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        keyboard.SPACE = false;
        event.preventDefault();
    }
    if (e.code === "ArrowUp") {
        keyboard.UP = false;
    }
    if (e.code === "ArrowDown") {
        keyboard.DOWN = false;
    }
    if (e.code === "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (e.code === "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (e.code === "KeyD") {
        keyboard.D = false;
    }
});

function startGame() {
    document.getElementById('startscreen').classList.toggle('dNone');

    init();
}
function init() {

    createLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, sound);
    gameStarted = true;
    gameover = false;
    firstContact = false;


    world.sound.startBackgroundMusic();
}
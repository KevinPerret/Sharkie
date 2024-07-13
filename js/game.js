let canvas;
let world;
let keyboard = new Keyboard();
let backgroundSound;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        keyboard.SPACE = true;
        event.preventDefault();
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
    document.getElementById('startscreen').style.display = 'none';
    backgroundSound = new Audio('audio/deepSeaBackground.mp3');
    backgroundSound.play();
    backgroundSound.loop = true;
    backgroundSound.volume = 0.8;
    init();
}
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
let isPaused = true;
function toggleGameOverScreen(win) {
    document.getElementById('gameOverScreen').classList.toggle('dNone');
    win ? document.getElementById('finalImage').src = "img/6.Botones/Tittles/You win/Recurso 19.png" : document.getElementById('finalImage').src = "img/6.Botones/Tittles/Game Over/Recurso 10.png"

}

function toggleOptionScreen() {
    document.getElementById('optionScreen').classList.toggle('dNone');
    document.getElementById('optionBtn').classList.toggle('dNone')
}

function addInterval(interval) {
    intervals.push(interval);
}

function stopAllIntervals() {
    intervals.forEach(interval => clearInterval(interval));
    intervals = [];
}

document.addEventListener('fullscreenchange', showExitImage);
document.addEventListener('webkitfullscreenchange', showExitImage);
document.addEventListener('mozfullscreenchange', showExitImage);
document.addEventListener('MSFullscreenChange', showExitImage);


function openFullscreen(elemId) {
    let elem = document.getElementById(elemId);
    if (elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }

    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }

}

function showExitImage() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        document.getElementById('exitFullscreen').classList.remove('dNone');
    } else {
        document.getElementById('exitFullscreen').classList.add('dNone');
    }
}


function checkOrientation() {
    if (!window.matchMedia("(orientation: landscape)").matches) {
        document.getElementById('noLandscape').classList.remove('dNone');
    } else {
        document.getElementById('noLandscape').classList.add('dNone');

    }
}


window.addEventListener("resize", checkOrientation);


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

function bindMobileBtns() {
    addTouchListeners('keyUp', 'UP');
    addTouchListeners('keyDown', 'DOWN');
    addTouchListeners('keyRight', 'RIGHT');
    addTouchListeners('keyLeft', 'LEFT');
    addTouchListeners('attackBtn', 'SPACE');
    addTouchListeners('meeleAttackBtn', 'D');
}


function addTouchListeners(elementId, key) {
    const options = { passive: false };
    const element = document.getElementById(elementId);

    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[key] = true;
    }, options);

    element.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[key] = false;
    }, options);
}



function startGame() {
    document.getElementById('startscreen').classList.toggle('dNone');
    isPaused = false;
    init();
}

function pauseGame() {
    isPaused = true;
}
function resumeGame() {
    isPaused = false;
}

function init() {

    createLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, sound);
    gameStarted = true;
    gameover = false;
    firstContact = false;
    bindMobileBtns();

    world.sound.startBackgroundMusic();
}
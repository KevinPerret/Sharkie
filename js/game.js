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

document.addEventListener('DOMContentLoaded', function() {
    fetch('privacy-policy.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('privacyPolicy').innerHTML = data;
        })
        .catch(error => console.error('Error loading the privacy policy:', error));
});

function togglePrivacyPolicy(){
    document.getElementById('privacyPolicy').classList.toggle('dNone');
}

/**
 * toggles the game over Screen based on the win condition
 * @param {Boolean} win  
 */
function toggleGameOverScreen(win) {
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalImage = document.getElementById('finalImage');

    gameOverScreen.classList.toggle('dNone');
    finalImage.src = win ?
        "img/6.Botones/Tittles/You win/Recurso 19.png" :
        "img/6.Botones/Tittles/Game Over/Recurso 10.png";
}

/**
 * Toggles the visibility of the options screen and button.
 */
function toggleOptionScreen() {
    document.getElementById('optionScreen').classList.toggle('dNone');
    document.getElementById('optionBtn').classList.toggle('dNone')
}

/**
 * Toggles the visibility of the tutorial/instruction screen.
 */
function toggleTutorialScreen() {
    document.getElementById('instructionScreen').classList.toggle('dNone');
}

/**
 * Adds a new interval to the list of intervals.
 * @param {number} interval - The ID of the interval to add.
 */
function addInterval(interval) {
    intervals.push(interval);
}

/**
 * Clears all intervals in the list and resets the intervals array.
 */
function stopAllIntervals() {
    intervals.forEach(interval => clearInterval(interval));
    intervals = [];
}

document.addEventListener('fullscreenchange', showExitImage);
document.addEventListener('webkitfullscreenchange', showExitImage);
document.addEventListener('mozfullscreenchange', showExitImage);
document.addEventListener('MSFullscreenChange', showExitImage);

/**
 * Opens the fullscreen mode for a specified element.
 * @param {string} elemId - The ID of the element to make fullscreen.
 */
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

/**
 * Checks if the device supports touch and toggles the visibility of mobile controls accordingly.
 */
function checkIfTouch() {
    let controls = document.getElementById('mobileControls');
    if ("ontouchstart" in document.documentElement)
        controls.classList.remove('dNone');
    else controls.classList.add('dNone');
}

/**
 * Exits fullscreen mode if it is currently active.
 */
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

/**
 * Shows or hides the exit fullscreen button based on the fullscreen status.
 */
function showExitImage() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        document.getElementById('exitFullscreen').classList.remove('dNone');
    } else {
        document.getElementById('exitFullscreen').classList.add('dNone');
    }
}

/**
 * Checks the device orientation and toggles the visibility of a message if not in landscape mode.
 */
function checkOrientation() {
    if (!window.matchMedia("(orientation: landscape)").matches) {
        document.getElementById('noLandscape').classList.remove('dNone');
    } else {
        document.getElementById('noLandscape').classList.add('dNone');
    }
}

window.addEventListener("resize", checkOrientation);

/**
 * Handles keydown events to set the corresponding keyboard state to true.
 * Prevents default behavior for the Space key.
 * @param {KeyboardEvent} e - The keydown event.
 */
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        keyboard.SPACE = true;
        e.preventDefault();
    }
    if (e.code === "ArrowUp")
        keyboard.UP = true;
    if (e.code === "ArrowDown")
        keyboard.DOWN = true;
    if (e.code === "ArrowLeft")
        keyboard.LEFT = true;
    if (e.code === "ArrowRight")
        keyboard.RIGHT = true;
    if (e.code === "KeyD")
        keyboard.D = true;
});

/**
 * Handles keyup events to set the corresponding keyboard state to false.
 * Prevents default behavior for the Space key.
 * @param {KeyboardEvent} e - The keyup event.
 */
window.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        keyboard.SPACE = false;
        event.preventDefault();
    }
    if (e.code === "ArrowUp")
        keyboard.UP = false;
    if (e.code === "ArrowDown")
        keyboard.DOWN = false;
    if (e.code === "ArrowLeft")
        keyboard.LEFT = false;
    if (e.code === "ArrowRight")
        keyboard.RIGHT = false;
    if (e.code === "KeyD")
        keyboard.D = false;
});

/**
 * Binds touch event listeners to mobile control buttons to update keyboard states.
 */
function bindMobileBtns() {
    addTouchListeners('keyUp', 'UP');
    addTouchListeners('keyDown', 'DOWN');
    addTouchListeners('keyRight', 'RIGHT');
    addTouchListeners('keyLeft', 'LEFT');
    addTouchListeners('attackBtn', 'SPACE');
    addTouchListeners('meeleAttackBtn', 'D');
}

/**
 * Adds touch event listeners to an element to update the keyboard state on touch events.
 * @param {string} elementId - The ID of the element to add listeners to.
 * @param {string} key - The keyboard key to associate with this element.
 */
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

/**
 * Starts the game by toggling the start screen visibility and initializing the game world.
 */
function startGame() {
    document.getElementById('startscreen').classList.toggle('dNone');
    isPaused = false;
    init();
}

/**
 * Pauses the game.
 */
function pauseGame() {
    isPaused = true;
}

/**
 * Resumes the game.
 */
function resumeGame() {
    isPaused = false;
}

/**
 * Initializes the game by checking orientation and touch support, creating the game world, and starting background music.
 */
function init() {
    checkOrientation()
    checkIfTouch();
    createLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, sound);
    gameStarted = true;
    gameover = false;
    firstContact = false;
    bindMobileBtns();
    world.sound.startBackgroundMusic();
}
/**
 * Manages sound effects and background music for the game.
 */
class Sound {

  /**
   * Initializes the Sound class by setting up all audio sources and mute button.
   */
  constructor() {
    this.bossHurtSound = new Audio('audio/bosshurt.mp3');
    this.bossDeadSound = new Audio('audio/bossdead.mp3');
    this.swimmingSound = new Audio('audio/swimShort.mp3');
    this.poisonedSound = new Audio('audio/poisoned.mp3');
    this.shockedSound = new Audio('audio/eshock.mp3');
    this.deadSound = new Audio('audio/charDead.mp3');
    this.snoringSound = new Audio('audio/snoring.mp3');
    this.bubbleSound = new Audio('audio/bigBubble.mp3');
    this.meeleSound = new Audio('audio/meelehit.mp3');
    this.jellyHurtSound = new Audio('audio/jellyhurt.mp3');
    this.pufferHurtSound = new Audio('audio/pufferhurt.mp3');
    this.collectSound = new Audio('audio/coin.mp3');
    this.backgroundSound = new Audio('audio/bgmusic.mp3');
    this.bossAttackSound = new Audio('audio/bossAttack.mp3');
    this.winSound = new Audio('audio/win.mp3');
    this.gameOverSound = new Audio('audio/gameover.mp3');

    this.allAudios = [
      this.bossHurtSound,
      this.bossDeadSound,
      this.swimmingSound,
      this.poisonedSound,
      this.shockedSound,
      this.deadSound,
      this.snoringSound,
      this.bubbleSound,
      this.meeleSound,
      this.jellyHurtSound,
      this.collectSound,
      this.pufferHurtSound,
      this.bossAttackSound,
      this.winSound,
      this.gameOverSound
    ];

    this.isMuted = false;
    this.muteBtn = document.querySelector('#muteBtn');
    this.setVolume(0.08);
    this.initMuteButton();
  }

  /**
   * Starts playing the background music and sets it to loop.
   */
  startBackgroundMusic() {
    this.backgroundSound.play();
    this.backgroundSound.volume = 0.03;
    this.backgroundSound.loop = true;
  }

  /**
   * Sets the volume for all audio elements.
   * @param {number} volume - The volume level to set (0 to 1).
   */
  setVolume(volume) {
    this.allAudios.forEach((audio) => {
      audio.volume = volume;
    });
  }

  /**
   * Initializes the mute button and sets up the click event listener.
   */
  initMuteButton() {
    if (this.muteBtn) {
      this.muteBtn.addEventListener('click', () => this.toggleMute());
    }
  }

  /**
   * Toggles the mute state between muted and unmuted.
   */
  toggleMute() {
    this.isMuted ? this.unmute() : this.mute();
  }

  /**
   * Mutes all audio elements.
   */
  mute() {
    this.setAudioVolume(0);
    this.isMuted = true;
  }

  /**
   * Unmutes all audio elements.
   */
  unmute() {
    this.setAudioVolume(0.1);
    this.isMuted = false;
  }

  /**
   * Sets the volume for all audio elements and adjusts the background sound accordingly.
   * @param {number} volume - The volume level to set (0 to 1).
   */
  setAudioVolume(volume) {
    this.allAudios.forEach(audio => audio.volume = volume);
    this.backgroundSound.volume = volume === 0 ? 0 : 0.03;
  }
}

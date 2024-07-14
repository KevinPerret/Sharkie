class Sound {

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
      this.backgroundSound,
      this.pufferHurtSound

    ];
    this.setVolume(0.1);
    this.muteAudio();

  }



  startBackgroundMusic() {
    this.backgroundSound.play();
    this.backgroundSound.loop = true;
  }

  setVolume(volume) {
    this.allAudios.forEach((audio) => {
      audio.volume = volume;
    });
  }

  muteAudio() {
    let muteBtn = document.querySelector('#muteBtn');
    let isMuted = false;
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        if (!isMuted) {
          this.allAudios.forEach((audio) => {
            audio.volume = 0;
          });
          isMuted = true;
        }
        else {
          this.allAudios.forEach((audio) => {
            audio.volume = 0.1;
          })
          isMuted = false;
        }
      });
    }
  }

  unmuteAudio() {
    this.allAudios.forEach((audio) => {
      audio.volume = 0.1;
    });
  }
}

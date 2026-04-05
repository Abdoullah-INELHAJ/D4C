/**
 * Custom Video Player JS
 */
class CustomVideoPlayer extends HTMLElement {
  constructor() {
    super();
    this.video = this.querySelector('video');
    this.playPauseBtn = this.querySelector('.custom-video__play-pause');
    this.progressBar = this.querySelector('.custom-video__progress-bar');
    this.progressContainer = this.querySelector('.custom-video__progress');
    this.muteBtn = this.querySelector('.custom-video__mute');
    
    if (this.video) {
       this.init();
    }
  }

  init() {
    this.video.addEventListener('timeupdate', () => this.updateProgress());
    this.playPauseBtn?.addEventListener('click', () => this.togglePlay());
    this.progressContainer?.addEventListener('click', (e) => this.scrub(e));
    this.muteBtn?.addEventListener('click', () => this.toggleMute());
  }

  togglePlay() {
    if (this.video.paused) {
      this.video.play();
      this.playPauseBtn.innerHTML = '{% render "icon-pause" %}';
    } else {
      this.video.pause();
      this.playPauseBtn.innerHTML = '{% render "icon-play" %}';
    }
  }

  updateProgress() {
    const percent = (this.video.currentTime / this.video.duration) * 100;
    if (this.progressBar) {
       this.progressBar.style.width = `${percent}%`;
    }
  }

  scrub(e) {
    const scrubTime = (e.offsetX / this.progressContainer.offsetWidth) * this.video.duration;
    this.video.currentTime = scrubTime;
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    this.muteBtn.classList.toggle('is-muted', this.video.muted);
  }
}

customElements.define('custom-video-player', CustomVideoPlayer);

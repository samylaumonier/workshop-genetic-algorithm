import { engineConfig } from '../../config';

export class Toolbar {
  constructor(viewer, id) {
    this.viewer = viewer;
    this.height = 30;

    this.element = document.createElement('div');
    this.element.id = id;
    this.element.style.width = `${viewer.viewerConfig.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.fontSize = `${this.height}px`;
    this.element.style.lineHeight = `${this.height}px`;
    this.element.style.top = `${viewer.viewerConfig.height - this.height}px`;

    this.onBackwardListener = this.onBackward.bind(this);
    this.onPreviousListener = this.onPrevious.bind(this);
    this.onPlayOrPauseListener = this.onPlayOrPause.bind(this);
    this.onNextListener = this.onNext.bind(this);
    this.onForwardListener = this.onForward.bind(this);

    this.backward = document.createElement('span');
    this.backward.textContent = '⏮';
    this.backward.addEventListener('click', this.onBackwardListener);
    this.element.appendChild(this.backward);

    this.previous = document.createElement('span');
    this.previous.textContent = '⏪';
    this.previous.addEventListener('click', this.onPreviousListener);
    this.element.appendChild(this.previous);

    this.playOrPause = document.createElement('span');
    this.playOrPause.textContent = '▶️';
    this.playOrPause.addEventListener('click', this.onPlayOrPauseListener);
    this.element.appendChild(this.playOrPause);

    this.next = document.createElement('span');
    this.next.textContent = '⏩';
    this.next.addEventListener('click', this.onNextListener);
    this.element.appendChild(this.next);

    this.forward = document.createElement('span');
    this.forward.textContent = '⏭';
    this.forward.addEventListener('click', this.onForwardListener);
    this.element.appendChild(this.forward);

    document.body.insertBefore(this.element, document.body.lastChild);
  }

  onBackward() {
    if (this.viewer.generation === 0) {
      this.viewer.generation = this.viewer.totalGenerations;
    } else {
      this.viewer.generation--;
    }

    this.viewer.currentMove = engineConfig.totalGenes - 1;
  }

  onPrevious() {
    this.viewer.currentMove = (this.viewer.currentMove - 1) % this.viewer.engineConfig.totalGenes;

    if (this.viewer.currentMove === -1) {
      this.onBackward();
    }
  }

  onPlayOrPause() {
    if (!this.viewer.initialized) {
      this.viewer.initialized = true;
      this.viewer.onInit();
    }

    const shouldReset = this.viewer.generation === this.viewer.totalGenerations
      && this.viewer.currentMove === engineConfig.totalGenes - 1;

    if (shouldReset) {
      this.viewer.generation = 0;
      this.viewer.currentMove = 0;
    }

    this.viewer.paused = !this.viewer.paused;
    this.playOrPause.textContent = this.viewer.paused ? '▶️' : '⏸️';
  }

  onNext() {
    this.viewer.currentMove = (this.viewer.currentMove + 1) % this.viewer.engineConfig.totalGenes;

    if (this.viewer.currentMove === 0) {
      this.onForward();
    }
  }

  onForward() {
    if (this.viewer.generation === this.viewer.totalGenerations) {
      this.viewer.generation = 0;
    } else {
      this.viewer.generation++;
    }

    this.viewer.currentMove = 0;
  }

  remove() {
    this.backward.removeEventListener('click', this.onBackwardListener);
    this.previous.removeEventListener('click', this.onPreviousListener);
    this.playOrPause.removeEventListener('click', this.onPlayOrPauseListener);
    this.next.removeEventListener('click', this.onNextListener);
    this.forward.removeEventListener('click', this.onForwardListener);

    this.element.remove();
  }

  setPause() {
    this.playOrPause.textContent = '▶️';
  }
}

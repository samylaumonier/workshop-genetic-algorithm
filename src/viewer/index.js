import { viewerConfig, engineConfig, libConfig } from '../config';
import { Toolbar } from './toolbar';

import { GridLayer } from './layers/grid';
import { PointsLayer } from './layers/points';
import { IndividualsLayer } from './layers/individuals';
import { StatsLayer } from './layers/stats';

export class Viewer {
  static instance = null;

  static init(onInit, id = 'viewer', toolbarId = 'toolbar') {
    Viewer.destroy();
    Viewer.instance = new Viewer(onInit, id, toolbarId);
  }

  static destroy() {
    if (Viewer.instance) {
      Viewer.instance.destroy();
      Viewer.instance = null;
    }
  }

  static update({ population, generation, isFinished, stats }) {
    if (Viewer.instance) {
      Viewer.instance.update({
        population,
        generation,
        isFinished,
        stats,
      });
    }
  }

  constructor(onInit, id, toolbarId) {
    // Init configs
    this.viewerConfig = { ...viewerConfig };
    this.engineConfig = { ...engineConfig };
    this.libConfig = { ...libConfig };

    // Init canvas
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.id = id;
    this.canvas.width = viewerConfig.width;
    this.canvas.height = viewerConfig.height;

    document.body.insertBefore(this.canvas, document.body.firstChild);

    // Init toolbar
    this.toolbar = new Toolbar(this, toolbarId);

    // Init layers
    this.layers = [
      new GridLayer(this),
      new PointsLayer(this),
      new IndividualsLayer(this),
      new StatsLayer(this),
    ];

    // Init lib
    this.populations = {};
    this.stats = {};
    this.winners = {};
    this.generation = 0;
    this.totalGenerations = 0;
    this.isFinished = false;

    // Init simulation
    this.currentMove = 0;
    this.paused = true;
    this.initialized = false;
    this.onInit = onInit;

    // Init rendering
    this.start();
  }

  draw() {
    this.clear();
    this.layers.forEach(layer => layer.draw());
  }

  update({ population, generation, isFinished, stats }) {
    this.totalGenerations = generation;
    this.populations[generation] = population;
    this.stats[generation] = stats;
    this.winners[generation] = population.reduce(
      (total, individual) => individual.entity.win ? total + 1 : total,
      0
    );
    this.isFinished = isFinished;
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.canvas.remove();
    this.toolbar.remove();
  }

  clear() {
    this.context.clearRect(0, 0, viewerConfig.width, viewerConfig.height);
  }

  start() {
    this.interval = setInterval(() => {
      this.draw();

      if (this.paused || !this.populations[this.generation]) {
        return;
      }

      const shouldPause = this.generation === this.totalGenerations
        && this.currentMove === engineConfig.totalGenes - 1;

      if (shouldPause) {
        this.paused = true;
        this.toolbar.setPause();
        return;
      }

      if (this.viewerConfig.fastPreviewMode) {
        this.currentMove = engineConfig.totalGenes - 1;

        if (this.generation !== this.totalGenerations) {
          this.generation++;
        }
      } else {
        this.currentMove = (this.currentMove + 1) % engineConfig.totalGenes;

        if (this.currentMove === 0 && this.generation !== this.totalGenerations) {
          this.generation++;
        }
      }
    }, 1000 / viewerConfig.fps);
  }
}

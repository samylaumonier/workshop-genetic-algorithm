import { engineConfig, libConfig } from '../../config';

export class StatsLayer {
  constructor(viewer) {
    this.viewer = viewer;
    this.x = 2;
    this.y = 12;
  }

  draw() {
    const { context, viewerConfig } = this.viewer;

    if (!viewerConfig.drawStats) {
      return;
    }

    context.font = '12px serif';
    context.fillStyle = 'black';
    this.y = 12;

    // Generation
    const { generation, totalGenerations } = this.viewer;
    const generationText = `Generation ${generation + 1}/${totalGenerations + 1}`;
    this.drawRow(generationText);

    // Move
    const { currentMove } = this.viewer;
    const moveText = `Move ${currentMove + 1}/${engineConfig.totalGenes}`;
    this.drawRow(moveText);

    // Computation
    const { initialized, isFinished } = this.viewer;
    const computationText = initialized
      ? isFinished ? 'done' : 'running'
      : 'waiting';
    this.drawRow(`Computation: ${computationText}`);

    // Stats
    const { stats, winners } = this.viewer;

    if (stats[generation]) {
      const bestScore = stats[generation].maximum.toFixed(2);
      this.drawRow(`Best score: ${bestScore}`);

      const winnersText = `${winners[generation]}/${libConfig.size}`;
      this.drawRow(`Winners: ${winnersText}`);

      const winRate = winners[generation] * 100 / libConfig.size;
      this.drawRow(`Win rate: ${winRate.toFixed(2)}%`);
    }
  }

  drawRow(text) {
    const { context } = this.viewer;
    context.fillText(text, this.x, this.y);
    this.y += 10;
  }
}

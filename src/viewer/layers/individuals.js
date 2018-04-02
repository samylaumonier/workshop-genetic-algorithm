import { startPoint, endPoint } from '../../config';
import moveIndividual from '../../engine/helpers/move-individual';

export class IndividualsLayer {
  constructor(viewer) {
    this.viewer = viewer;

    this.fakeEngine = {
      getConfig: () => viewer.engineConfig,
    };

    this.moveIndividual = moveIndividual.bind(this.fakeEngine);
  }

  draw() {
    const { populations, generation, viewerConfig } = this.viewer;
    const individuals = populations[generation];

    if (individuals) {
      for (let i = individuals.length - 1; i >= 0; i--) {
        const individual = individuals[i];
        const shouldHighlight = individual.entity.win === false && i <= 1 && viewerConfig.highlightBestIndividual;
        this.drawIndividual(individual.entity, individual.fitness, shouldHighlight);
      }
    }
  }

  drawIndividual(individual, fitness, shouldHighlight = false) {
    const { context, currentMove, viewerConfig } = this.viewer;

    context.lineWidth = shouldHighlight || individual.win ? 3 : 1;
    context.beginPath();

    let position = {
      x: startPoint.x,
      y: startPoint.y,
    };

    const shouldDrawPath = individual.win
      || shouldHighlight
      || viewerConfig.drawLosersPath;

    if (shouldDrawPath) {
      context.beginPath();
      context.moveTo(position.x, position.y);
    }

    for (let move = 0; move <= currentMove; move++) {
      if (move >= individual.genes.length) {
        break;
      }

      position = this.moveIndividual(position, individual.genes[move]);

      if (shouldDrawPath) {
        context.lineTo(position.x, position.y);
      }

      if (position.x === endPoint.x && position.y === endPoint.y) {
        break;
      }
    }

    const color = shouldHighlight
      ? '#3498db'
      : individual.win ? '#2ecc71' : '#e74c3c';

    if (shouldDrawPath) {
      context.strokeStyle = color;
      context.stroke();
    }

    context.beginPath();
    context.arc(position.x, position.y, viewerConfig.individualRadius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();

    if (viewerConfig.drawFitness) {
      context.font = '9px serif';
      context.fillStyle = color;
      context.fillText(
        fitness.toFixed(0),
        position.x + viewerConfig.gridStep / 4,
        position.y - viewerConfig.gridStep / 4
      );
    }
  }
}

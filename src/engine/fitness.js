import { engine } from './';

engine.fitness = function (individual) {
  const { startPoint, endPoint } = this.getConfig();

  let position = {
    x: startPoint.x,
    y: startPoint.y,
  };

  let bestDistance = Infinity;

  individual.genes.forEach(gene => {
    position = this.moveIndividual(position, gene);
    const distance = this.getDistance(position, endPoint);

    if (distance < bestDistance) {
      bestDistance = distance;
    }

    if (distance === 0) {
      individual.win = true;
    }
  });

  return bestDistance;
};

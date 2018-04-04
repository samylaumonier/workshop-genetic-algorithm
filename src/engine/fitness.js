import { engine } from './';

engine.fitness = function (individual) {
  const { startPoint, endPoint } = this.getConfig();

  let position = {
    x: startPoint.x,
    y: startPoint.y,
  };

  individual.bestDistance = Infinity;
  individual.totalMoves = 0;

  individual.genes.some(gene => {
    position = this.moveIndividual(position, gene);
    individual.totalMoves++;

    const distance = this.getDistance(position, endPoint);

    if (!individual.win) {
      individual.win = distance === 0;
    }

    if (distance < individual.bestDistance) {
      individual.bestDistance = distance;
    }

    return individual.win;
  });

  return individual.bestDistance + individual.totalMoves;
};

import { engine } from './';

engine.seed = function () {
  const { totalGenes } = this.getConfig();
  const genes = new Array(totalGenes);

  genes[0] = this.getRandomDirection();

  for (let i = 1; i < totalGenes; i++) {
    const previousDirection = genes[i - 1];
    const inverseDirection = this.getInverseDirection(previousDirection);
    const directions = this.getDirectionsExceptOne(inverseDirection);

    genes[i] = this.getRandomValue(directions);
  }

  return {
    genes,
  };
};

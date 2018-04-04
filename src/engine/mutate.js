import { engine } from './';

engine.mutate = function (individual) {
  const i = Math.floor(Math.random() * individual.genes.length);
  const directions = i === 0
    ? this.getDirectionsExceptOne(individual.genes[i])
    : this.getDirectionsExceptMany([
      individual.genes[i],
      this.getInverseDirection(individual.genes[i - 1]),
    ]);

  individual.genes[i] = this.getRandomValue(directions);

  return individual;
};

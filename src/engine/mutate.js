import { engine } from './';

engine.mutate = function (individual) {
  const i = Math.floor(Math.random() * individual.genes.length);
  individual.genes[i] = this.getRandomDirection();

  return individual;
};

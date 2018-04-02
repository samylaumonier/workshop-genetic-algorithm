import { engine } from './';

engine.generation = function (population) {
  const { stopOnWin } = this.getConfig();

  if (stopOnWin) {
    const winnerFound = population.some(individual => individual.entity.win);

    if (winnerFound) {
      return false;
    }
  }

  return true;
};

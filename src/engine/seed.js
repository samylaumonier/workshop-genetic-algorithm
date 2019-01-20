import { engine } from './';

engine.seed = function () {
  const { totalGenes } = this.getConfig();

  return {
    genes: new Array(totalGenes)
      .fill(null)
      .map(() => this.getRandomDirection()),
  };
};

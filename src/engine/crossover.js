import { engine } from './';

engine.crossover = function (mother, father) {
  const getHalfLength = genes => Math.floor(genes.length / 2);
  const getLeftHalf = ({ genes }) => genes.slice(0, getHalfLength(genes));
  const getRightHalf = ({ genes }) => genes.slice(getHalfLength(genes), genes.length);

  const daughterGenes = getLeftHalf(mother).concat(getRightHalf(father));
  const sonGenes = getLeftHalf(father).concat(getRightHalf(mother));

  const daughter = { genes: daughterGenes };
  const son = { genes: sonGenes };

  return [daughter, son];
};

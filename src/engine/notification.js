import { engine } from './';
import { Viewer } from '../viewer/index';

engine.notification = function (population, generation, stats, isFinished) {
  Viewer.update({
    population,
    generation,
    isFinished,
    stats,
  });
};

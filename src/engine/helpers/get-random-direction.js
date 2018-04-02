import { engine } from '../';

engine.getRandomDirection = function () {
  const directions = this.getDirections();
  return this.getRandomValue(directions);
};

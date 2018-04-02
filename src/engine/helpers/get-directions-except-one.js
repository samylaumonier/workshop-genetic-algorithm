import { engine } from '../';

engine.getDirectionsExceptOne = function (except) {
  const directions = this.getDirections();
  const index = directions.indexOf(except);

  if (index !== -1) {
    directions.splice(index, 1);
  }

  return directions;
};

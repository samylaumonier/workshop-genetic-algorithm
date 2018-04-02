import { engine } from '../';

engine.getDirectionsExceptMany = function (excepts) {
  const directions = this.getDirections();

  excepts.forEach(except => {
    const index = directions.indexOf(except);

    if (index !== -1) {
      directions.splice(index, 1);
    }
  });

  return directions;
};

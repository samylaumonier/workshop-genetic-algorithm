import { engine } from '../';

engine.moveIndividual = function (position, direction) {
  const { directions, gridStep } = this.getConfig();
  const { NORTH, EAST, SOUTH, WEST } = directions;

  switch (direction) {
    case NORTH:
      return {
        x: position.x,
        y: position.y - gridStep,
      };
    case EAST:
      return {
        x: position.x + gridStep,
        y: position.y
      };
    case SOUTH:
      return {
        x: position.x,
        y: position.y + gridStep,
      };
    case WEST:
      return {
        x: position.x - gridStep,
        y: position.y,
      };
    default:
      throw new Error(`Invalid direction ${direction}`);
  }
};

export default engine.moveIndividual;

import { engine } from '../';

engine.getInverseDirection = function (direction) {
  const { NORTH, EAST, SOUTH, WEST } = this.getConfig().directions;

  switch (direction) {
    case NORTH:
      return SOUTH;
    case EAST:
      return WEST;
    case SOUTH:
      return NORTH;
    case WEST:
      return EAST;
    default:
      throw new Error(`Invalid direction ${direction}`);
  }
};

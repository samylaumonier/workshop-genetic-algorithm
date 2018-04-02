import { engine } from '../';

engine.getDirections = function () {
  return Object.values(this.getConfig().directions);
};

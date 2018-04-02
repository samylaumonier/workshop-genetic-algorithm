import { engine } from '../';

engine.getConfig = function () {
  return this.userData;
};

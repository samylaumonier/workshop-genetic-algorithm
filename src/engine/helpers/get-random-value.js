import { engine } from '../';

engine.getRandomValue = values =>
  values[Math.floor(Math.random() * values.length)];

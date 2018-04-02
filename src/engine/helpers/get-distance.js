import { engine } from '../';

engine.getDistance = (a, b) =>
  Math.sqrt(
    (b.x - a.x) ** 2 +
    (b.y - a.y) ** 2
  );

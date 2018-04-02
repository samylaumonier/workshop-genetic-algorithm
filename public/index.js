import { Viewer } from '../src/viewer';
import { engine } from '../src/engine';
import { libConfig, engineConfig } from '../src/config';

import '../src/engine/init';

if (module.hot) {
  module.hot.dispose(() => {
    Viewer.destroy();
  });
}

Viewer.init(() => {
  engine.evolve(libConfig, engineConfig);
});

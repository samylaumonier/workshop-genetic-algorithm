export const viewerConfig = {
  width: 800,
  height: 600,
  gridStep: 10,
  pointRadius: 5,
  individualRadius: 3,
  fps: 60,
  highlightBestIndividual: true,
  drawLosersPath: true,
  drawFitness: false,
  drawStats: true,
  fastPreviewMode: false,
};

export const startPoint = {
  x: viewerConfig.width / 4,
  y: viewerConfig.height / 2,
};

export const endPoint = {
  x: viewerConfig.width * 0.75,
  y: viewerConfig.height / 2,
};

export const libConfig = {
  crossover: 0.9,
  fittestAlwaysSurvives: false,
  iterations: 100,
  maxResults: 250,
  mutation: 0.01,
  size: 250,
  skip: 0,
  webWorkers: true,
};

export const engineConfig = {
  totalGenes: 60,
  directions: {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3,
  },
  startPoint,
  endPoint,
  gridStep: viewerConfig.gridStep,
  stopOnWin: true,
};

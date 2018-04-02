export class GridLayer {
  constructor(viewer) {
    this.viewer = viewer;
  }

  draw() {
    const { context, viewerConfig } = this.viewer;

    context.lineWidth = 1;
    context.strokeStyle = '#D0D0D0';

    const xMin = viewerConfig.gridStep;
    const xMax = viewerConfig.width;

    for (let x = xMin; x < xMax; x += viewerConfig.gridStep) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, viewerConfig.height);
      context.stroke();
    }

    const yMin = viewerConfig.gridStep;
    const yMax = viewerConfig.height;

    for (let y = yMin; y < yMax; y += viewerConfig.gridStep) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(viewerConfig.width, y);
      context.stroke();
    }
  }
}

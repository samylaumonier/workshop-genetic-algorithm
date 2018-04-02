import { endPoint, startPoint, viewerConfig } from '../../config';

export class PointsLayer {
  constructor(viewer) {
    this.viewer = viewer;
  }

  draw() {
    this.drawPoint(startPoint, '#3498db');
    this.drawPoint(endPoint, '#2ecc71');
  }

  drawPoint(position, color) {
    const { context } = this.viewer;

    context.beginPath();
    context.arc(position.x, position.y, viewerConfig.pointRadius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
  }
}

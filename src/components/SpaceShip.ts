import { IfcSpaceShipSettings } from './interfaces';
import GameObject from './GameObject';

let cursor = {
  clientX: 0,
  clientY: 0,
};

let patrolFactor = 1;

window.addEventListener('mousemove', e => {
  cursor = e;
});

export default class SpaceShip extends GameObject {
  constructor(
    public canvas: HTMLCanvasElement,
    public settings: IfcSpaceShipSettings
  ) {
    super(canvas, settings);
    this.setSprite('https://art.pixilart.com/df632599c62ec0a.gif');
  }

  playerMovements() {
    const { x, y, isPlayer } = this.settings;

    const threshold = 10;

    if(
      isPlayer &&
      (Math.abs(x - cursor.clientX) > threshold || Math.abs(y - cursor.clientY) > threshold)
    ) {
      this.moveTo(cursor.clientX, cursor.clientY);
    }
  }

  patrol() {
    const { x, y } = this.settings;

    if(x > window.innerWidth) {
      patrolFactor = 1;
    } else if(x < 0) {
      patrolFactor = -1;
    }

    this.moveTo(x - 1 * patrolFactor, y);
  }

  render() {
    this.playerMovements();
    super.render();
  }
}

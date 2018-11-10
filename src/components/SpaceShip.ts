import { IfcSpaceShipSettings } from './interfaces';
import GameObject from './GameObject';

let cursor = {
  clientX: 0,
  clientY: 0,
};

window.addEventListener('mousemove', e => {
  cursor = e;
});

export default class SpaceShip extends GameObject {
  constructor(
    public canvas: HTMLCanvasElement,
    public settings: IfcSpaceShipSettings
  ) {
    super(canvas, settings);
    this.setSprite('http://chittagongit.com//images/spaceship-icon-png/spaceship-icon-png-6.jpg');
  }

  playerMovements() {
    const { isPlayer } = this.settings;
    if(isPlayer) {
      this.moveTo(cursor.clientX, cursor.clientY);
    }
  }

  render() {
    this.playerMovements();
    super.render();
  }
}

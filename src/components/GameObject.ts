import { IfcSpaceShipSettings } from './interfaces';

export default class GameObject {
  ctx : CanvasRenderingContext2D;
  sprite: HTMLImageElement;

  constructor(
    public canvas: HTMLCanvasElement,
    public settings: IfcSpaceShipSettings
  ) {
    this.ctx = canvas.getContext('2d');
  }

  moveTo(newX, newY) {
    const { x, y } = this.settings;

    this.settings.rotation = - Math.atan2(newX - x, newY - y) * (180 / Math.PI) - 180;

    const radian = this.settings.rotation * Math.PI/180;

    this.settings.x = this.settings.x + Math.sin(radian);
    this.settings.y = this.settings.y - Math.cos(radian);
  }

  setSprite(src: string) {
    const img = new Image();
    img.src = src;

    this.sprite = img;
  }

  render() {
    const {
      x,
      y,
      width,
      height,
      rotation
    } = this.settings;

    this.ctx.save();

    const radian = rotation * Math.PI/180;

    this.ctx.translate(x + width / 2, y + height / 2);
    this.ctx.rotate(radian);
    this.ctx.translate(-x - width / 2, -y - height / 2);

    this.ctx.drawImage(this.sprite, x, y, width, height);

    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.restore();
  }
}

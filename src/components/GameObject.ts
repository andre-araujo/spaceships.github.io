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

    this.settings.x = this.settings.x + Math.sin(radian) * 2;
    this.settings.y = this.settings.y - Math.cos(radian) * 2;
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

    this.ctx.restore();
  }

  checkColision(gameObject: GameObject) {
    const selfBounding = this.getBoundingRect(this.settings);
    const otherBounding = this.getBoundingRect(gameObject.settings);

    this.showBoundaries(this);
    this.showBoundaries(gameObject);

    if(
      ((selfBounding.top >= otherBounding.top && selfBounding.top <= otherBounding.bottom) &&
      (selfBounding.right <= otherBounding.right && selfBounding.right >= otherBounding.left)) ||
      ((selfBounding.left >= otherBounding.left && selfBounding.left <= otherBounding.right) &&
      (selfBounding.bottom <= otherBounding.bottom && selfBounding.bottom >= otherBounding.top))
    ) {

      console.log('ok')
    }
  }

  /**
   * Debug only
   */
  showBoundaries(gameObject: GameObject) {
    const target = gameObject || this;

    this.ctx.save();
    this.ctx.strokeStyle  = 'red';
    this.ctx.strokeRect(target.settings.x, target.settings.y, target.settings.width, target.settings.height);
    this.ctx.restore();
  }

  getBoundingRect({x, y, width, height}) {
    return {
      top: y,
      right: x + width,
      bottom: y + height,
      left: x
    }
  }
}

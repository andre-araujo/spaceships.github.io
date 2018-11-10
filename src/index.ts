let rotation = 1;

let cursor = {
  clientX: 0,
  clientY: 0,
};

window.addEventListener('mousemove', e => {
  cursor = e;
})

interface SpaceShipSettings {
  x: number;
  y: number;
  rotation: number;
  isPlayer: boolean;
}

class SpaceShip {
  ctx : CanvasRenderingContext2D;

  constructor(
    public canvas: HTMLCanvasElement,
    public settings: SpaceShipSettings
  ) {
    this.ctx = canvas.getContext('2d');

    cursor = {
      clientX: settings.x,
      clientY: settings.y,
    };
  }

  playerMovements() {
    const { x, y, isPlayer } = this.settings;
    if(isPlayer) {
      this.settings.rotation = - Math.atan2(cursor.clientX - x, cursor.clientY - y) * (180 / Math.PI) - 180;

      const radian = this.settings.rotation * Math.PI/180;

      this.settings.x = this.settings.x + Math.sin(radian);
      this.settings.y = this.settings.y - Math.cos(radian);
    }
  }

  render() {
    const { x, y, rotation } = this.settings;

    this.playerMovements();

    this.ctx.save();

    const radian = rotation * Math.PI/180;
    const img = new Image();

    img.src = 'http://chittagongit.com//images/spaceship-icon-png/spaceship-icon-png-6.jpg';

    this.ctx.translate(x + 30 / 2, y + 30 / 2);
    this.ctx.rotate(radian);
    this.ctx.translate(-x - 30 / 2, -y - 30 / 2);

    this.ctx.drawImage(img, x, y, 30, 30);

    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.restore();
  }
}

class Stage {
  player: SpaceShip;
  enemy: SpaceShip;
  ctx : CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.onMount();
  }

  onMount() {
    window.addEventListener('resize', this.setFullScreen);
    this.setFullScreen();
    this.canvas.style.background = 'black';

    this.player = new SpaceShip(this.canvas, {
      x: 100,
      y: 100,
      isPlayer: true,
      rotation: 1
    });

    this.enemy = new SpaceShip(this.canvas, {
      x: 200,
      y: 200,
      isPlayer: false,
      rotation: 60
    });
  }

  setFullScreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.player.render();
    this.enemy.render();

    window.requestAnimationFrame(() => this.render());
  }
}

window.onload = () => {
  const canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
  const stage : Stage = new Stage(canvas);

  stage.render();
};

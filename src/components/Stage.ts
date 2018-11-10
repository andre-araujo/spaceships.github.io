import SpaceShip from './SpaceShip';

export default class Stage {
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
      rotation: 1,
      height: 30,
      width: 30
    });

    this.enemy = new SpaceShip(this.canvas, {
      x: 200,
      y: 200,
      isPlayer: false,
      rotation: 60,
      height: 60,
      width: 60
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
    this.player.checkColision(this.enemy);

    window.requestAnimationFrame(() => this.render());
  }
}

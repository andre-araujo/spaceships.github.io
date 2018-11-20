import SpaceShip from './SpaceShip';

const socket = require('socket.io-client')('http://localhost:3000');

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
      width: 30,
      id: Math.random(),
    });
  }

  setFullScreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  render() {
    socket.on('update', (enemies) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      enemies.forEach(enemyData => {
        if(enemyData.id !== this.player.settings.id) {
          const enemy = new SpaceShip(this.canvas, enemyData);
          this.player.checkColision(enemy);
          enemy.render();
        }
      });

      this.player.render();
      socket.emit('player', {...this.player.settings, isPlayer: false});
    });
  }
}

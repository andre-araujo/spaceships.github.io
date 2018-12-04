import Stage from './components/Stage';

window.onload = () => {
  const canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
  const stage : Stage = new Stage(canvas);

  stage.render();
};

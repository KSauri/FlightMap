import drawAirports from './sand_box';

const choose_src_dest = (canvas, ctx) => () => {

  let canvasLeft = canvas.offsetLeft;
  let canvasTop = canvas.offsetTop;

  ctx.clearRect(0,0,1000,700);
  drawAirports(ctx);
  canvas.addEventListener("click", (event) => {
    let x = event.pageX - canvasLeft;
    let y = event.pageY - canvasTop;

    console.log(x, y);
  });

};


export default choose_src_dest;

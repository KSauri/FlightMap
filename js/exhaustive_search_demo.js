import drawAirports from './draw_airports';
import all_airports from './us_airports';
import bfsPathGenerator from './generate_bfs_paths';
import drawPathGenerations from './draw_paths';


const myClosure = (func) => {
  return func;
};


const exhaustiveDemo = (canvas, ctx, all_airports, toggleButton) => {
  let canvasLeft = canvas.offsetLeft;
  let canvasTop = canvas.offsetTop;
  canvas.removeEventListener("click", eventListeners.drawPathCB);
  ctx.clearRect(0,0,940,580);
  ctx.drawImage(document.getElementById('source'), -16, -60);
  drawAirports(ctx);
  let drawBFSPaths = myClosure(drawPathGenerations);
  let bfsGenerator = myClosure(bfsPathGenerator);
  toggleButton("disable");
  drawBFSPaths(bfsGenerator(all_airports, all_airports["117"], null), toggleButton);
  document.getElementById("inOrbit").innerHTML = `Possible Choices: N/A`;
  document.getElementById("inOrbit-percentage").innerHTML = `% of Total: N/A`;
  document.getElementById("considered").innerHTML = `Considered Paths: 260`;
  document.getElementById("considered-percentage").innerHTML = `% of Total: 100`;
  document.getElementById("final").innerHTML = `Final Path Length: 2`;
};


export default exhaustiveDemo;

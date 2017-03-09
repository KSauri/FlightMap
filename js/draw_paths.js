var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const drawLineSegment = (pos, idx) => {
  ctx.beginPath();
  ctx.moveTo(pos[idx - 1].x, pos[idx - 1].y);
  ctx.lineTo(pos[idx].x, pos[idx].y);
  if (pos.final) {
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 2;
  } else {
    ctx.strokeStyle = "#e5df34";
    ctx.lineWidth = 1;
  }
  ctx.stroke();
  ctx.closePath();
};

function animate(lineSegmentCount, pathGenerations, generation, individualPath, toggleButton, wrapper) {
    const reAnimate = () => {
      animate(lineSegmentCount, pathGenerations, generation, individualPath, toggleButton, wrapper);
    };
    if (lineSegmentCount < pathGenerations[generation][individualPath].length - 1) {
        requestAnimationFrame(reAnimate);
    } else {
      generation ++;
      if (wrapper) { wrapper(pathGenerations, toggleButton, generation); }
      return;
    }
    drawLineSegment(pathGenerations[generation][individualPath], lineSegmentCount);
    lineSegmentCount++;
}


const drawPathGenerations = (pathGens, toggleButton, generation = 0) => {
  if (pathGens.length === generation) {
    toggleButton("enable");
    return;}
  while (pathGens[generation].length === 0 || generation === pathGens.length) {
    if (generation === pathGens.length - 1) { return; }
    generation ++;
  }
  for (var path = 0; path < pathGens[generation].length - 1; path++) {
    animate(1, pathGens, generation, path, toggleButton); // only one path calls drawPathGenerations to draw the next gen
  }
  let curr = pathGens[generation].length - 1;
  animate(1, pathGens, generation, curr, toggleButton, drawPathGenerations);
};



export default drawPathGenerations;

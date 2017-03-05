var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const drawLineSegment = (pos, idx) => {
  ctx.beginPath();
  ctx.moveTo(pos[idx - 1].y, pos[idx - 1].x);
  ctx.lineTo(pos[idx].y, pos[idx].x);
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.closePath();
};

function animate(total, ptsArr, idx, subidx, cb) {
    const reAnimate = () => {
      animate(total, ptsArr, idx, subidx, cb);
    };
    if (total < ptsArr[idx][subidx].length - 1) {
        requestAnimationFrame(reAnimate);
    } else {
      idx ++;
      if (cb !== undefined) { cb(ptsArr, idx); }
      return;
    }
    drawLineSegment(ptsArr[idx][subidx], total);
    total++;
}


const drawPathGenerations = (pathGens, generation = 0) => {
  // if (pathGens[generation].length === 0) {debugger;}
  while (pathGens[generation].length === 0 || generation === pathGens.length) {
    if (generation === pathGens.length) { return; }
    generation ++;
  }
  for (var path = 0; path < pathGens[generation].length - 1; path++) {
    animate(1, pathGens, generation, path); // only one path calls drawPathGenerations to draw the next gen
  }
  let curr = pathGens[generation].length - 1;
  animate(1, pathGens, generation, curr, drawPathGenerations);
};



export default drawPathGenerations;

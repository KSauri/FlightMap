function animate(total, ptsArr, idx, cb) {
    const reAnimate = () => {
      animate(total, ptsArr[idx]);
    };
    if (total < pts.length - 1) {
        requestAnimationFrame(reAnimate);
    } else {
      idx ++;
      cb(ptsArr, idx);
    }
    ctx.beginPath();
    ctx.moveTo(ptsArr[idx][total - 1].x, ptsArr[idx][total - 1].y);

    ctx.lineTo(ptsArr[idx][total].x, ptsArr[idx][total].y);
    ctx.stroke();
    ctx.closePath();
    total++;
}

let wrapper = (pointsArr, idx = 0) => {
  animate(1, pointsArr, idx, wrapper);
};

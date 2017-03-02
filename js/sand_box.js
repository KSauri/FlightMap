import airports from './airports';




const drawAirports = () => {

  var canvas = document.getElementById('canvas');
  canvas.width = 800;
  canvas.height = 500;
  var ctx = canvas.getContext('2d');


  for (var airport in airports) {
    ctx.beginPath();
    ctx.arc(airports[airport].pos.x, airports[airport].pos.y, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
};

export default drawAirports;

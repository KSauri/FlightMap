import all_airports from './us_airports';


const drawAirports = () => {

  var canvas = document.getElementById('canvas');
  canvas.width = 1000;
  canvas.height = 700;
  var ctx = canvas.getContext('2d');


  for (var airport in all_airports) {
    if (airport === "size") { continue; }
    ctx.beginPath();
    let y = all_airports[airport].pos.x;
    let x = all_airports[airport].pos.y;
    ctx.arc(x,y, 2.5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = '#2C5581';
    ctx.fill();
  }
};

export default drawAirports;

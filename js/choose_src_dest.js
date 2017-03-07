import drawAirports from './draw_airports';
import all_airports from './us_airports';
import pathGenerator from './generate_paths';
import drawPathGenerations from './draw_paths';

const findAirportFromCoords = (airports, x, y) => {
  let xAirports = [];
  let yAirports = [];
  for (let airport in airports) {
    if (Math.abs(airports[airport].pos.x - x) < 10) {
      xAirports.push(airport);
    }
  }
  for (let airport in airports) {
    if (Math.abs(airports[airport].pos.y - y) < 10) {
      yAirports.push(airport);
    }
  }

  let cA = commonAirports(xAirports, yAirports);
  return cA;
};

const commonAirports = (airportArrayOne, airportArrayTwo) => {
  return airportArrayOne.filter(function(n) {
    return airportArrayTwo.indexOf(n) !== -1;
  })[0].toString();
};

const returnAirports = (ap) => {
  return ap;
};

const myClosure = (func) => {
  return func;
};

const drawChosenAirport = (ctx, x, y) => {
  ctx.beginPath();
  ctx.arc(x-8,y-8, 6, 0, Math.PI * 2, true);
  ctx.fillStyle = "#c22f2f";
  ctx.closePath();
  ctx.fill();
};

const chooseSrcDest = (canvas, ctx, all_airports) => {

  let canvasLeft = canvas.offsetLeft;
  let canvasTop = canvas.offsetTop;
  let wtf = all_airports;
  ctx.clearRect(0,0,1000,700);
  ctx.drawImage(document.getElementById('source'), -16, -60);
  drawAirports(ctx);

  let srcAndDest = [];

  canvas.addEventListener("click", (event) => {
    let x = event.pageX - canvasLeft;
    let y = event.pageY - canvasTop;
    let context = myClosure(ctx);
    let airports = returnAirports(all_airports);
    let fAFC = myClosure(findAirportFromCoords);
    let airport = airports[fAFC(airports, x, y)];
    let sAD = myClosure(srcAndDest);
    let dPG = myClosure(drawPathGenerations);
    let pG = myClosure(pathGenerator);
    drawChosenAirport(ctx, x, y);
    sAD.push(airport);
    if (sAD.length > 1) {
      dPG(pG(airports, sAD[0], sAD[1]));
      sAD.pop();
      sAD.pop();
    }
    });

};


export default chooseSrcDest;

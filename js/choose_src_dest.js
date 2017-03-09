import drawAirports from './draw_airports';
import all_airports from './us_airports';
import pathGenerator from './generate_paths';
import drawPathGenerations from './draw_paths';
import { pythagoreanDis } from './airport_parsing_utils';
import astar from './a_star';

window.cancel = false;

const minDistanceAirport = (airports, commonAirports, x, y) => {
  if (commonAirports.length === 0) { return null; }
  let pos = {}; pos.x = x-8; pos.y = y-8;
  let closest = commonAirports[0];
  let minDist = pythagoreanDis(pos, airports[closest].pos);
  for (var i = 1; i < commonAirports.length; i++) {
    let currDist = pythagoreanDis(pos, airports[commonAirports[i]].pos);
    if (currDist < minDist) {
      closest = commonAirports[i];
      minDist = pythagoreanDis(pos, airports[i].pos);
    }
  }
  return closest;
};

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
  let airport = minDistanceAirport(airports, cA, x, y);

  return airport;
};

const commonAirports = (airportArrayOne, airportArrayTwo) => {
  return airportArrayOne.filter(function(n) {
    return airportArrayTwo.indexOf(n) !== -1;
  });
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

const chooseSrcDest = (canvas, ctx, all_airports, toggleButton) => {
  let canvasLeft = canvas.offsetLeft;
  let canvasTop = canvas.offsetTop;
  ctx.clearRect(0,0,1000,580);
  ctx.drawImage(document.getElementById('source'), -16, -60);
  drawAirports(ctx);
  let srcAndDest = [];

  let drawPath = canvas.addEventListener("click", (event) => {
    let startAndFinish = myClosure(srcAndDest);
    let x = event.pageX - canvasLeft;
    let y = event.pageY - canvasTop;
    let toggle = myClosure(toggleButton);
    let astarResults = myClosure(astar);
    let context = myClosure(ctx);
    let airports = myClosure(all_airports);
    let findAirports = myClosure(findAirportFromCoords);
    let airport = airports[findAirports(airports, x, y)];
    if (airport && startAndFinish.length < 3) { startAndFinish.push(airport);}
    let drawPaths = myClosure(drawPathGenerations);
    let pathGen = myClosure(pathGenerator);
    if (startAndFinish.length < 3 && airport) { drawChosenAirport(ctx, x, y);}
    if (startAndFinish.length === 2) {
      toggle("disable");
      let results = astarResults.search(airports, startAndFinish[0], startAndFinish[1])[1];
      document.getElementById("inOrbit").innerHTML = `Possible Choices: ${results[0]}`;
      document.getElementById("considered").innerHTML = `Considered Paths: ${results[1]}`;
      document.getElementById("final").innerHTML = `Final Path Length: ${results[2]}`;
      drawPaths(pathGen(airports, startAndFinish[0], startAndFinish[1]), toggle);
      }
    });

};




export default chooseSrcDest;

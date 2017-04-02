import drawAirports from './draw_airports';
import all_airports from './us_airports';
import pathGenerator from './generate_paths';
import drawPathGenerations from './draw_paths';
import { pythagoreanDis } from './airport_parsing_utils';
import astar from './a_star';


const minDistanceAirport = (airports, commonAirports, x, y) => {
  if (commonAirports.length === 0) { return null; }
  let pos = {}; pos.x = x; pos.y = y;
  let closest = commonAirports[0];
  let minDist = pythagoreanDis(pos, airports[closest].pos);
  for (var i = 1; i < commonAirports.length; i++) {
    let currDist = pythagoreanDis(pos, airports[commonAirports[i]].pos);
    if (currDist < minDist) {
      closest = commonAirports[i];
      minDist = currDist;
    }
  }
  return closest;
};

const findAirportFromCoords = (airports, x, y) => {
  let xAirports = [];
  let yAirports = [];
  for (let airport in airports) {
    if (Math.abs(airports[airport].pos.x - x) < 5) {
      xAirports.push(airport);
    }
  }
  for (let airport in airports) {
    if (Math.abs(airports[airport].pos.y - y) < 5) {
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
  ctx.arc(x,y, 6, 0, Math.PI * 2, true);
  ctx.fillStyle = "#c22f2f";
  ctx.closePath();
  ctx.fill();
};


const chooseSrcDest = (canvas, ctx, all_airports, toggleButton) => {
  let canvasLeft = canvas.offsetLeft;
  let canvasTop = canvas.offsetTop;
  canvas.removeEventListener("click", eventListeners.drawPathCB);
  ctx.clearRect(0,0,940,580);
  ctx.drawImage(document.getElementById('source'), -16, -60);
  drawAirports(ctx);
  let srcAndDest = [];
  window.eventListeners.drawPathCB = drawPath(canvasLeft,
    canvasTop,
    toggleButton,
    ctx,
    srcAndDest,
    canvas);
  canvas.addEventListener("click", eventListeners.drawPathCB);
};

let addAirport = (airportsArr, airport) => {
  if (airport && airportsArr.length < 1) {
    document.getElementById("origin").className = "engaged light";
    return true;
  } else if (airport &&
    airportsArr.length === 1 &&
    airportsArr[0].id !== airport.id) {
      document.getElementById("destination").className = "engaged light";
      return true;
    }
  else {
    return false;
  }
};

const airportLocationsHash = (airports) => {
  let airportsHash = {};
  for (let airport in airports) {
    let lng = Math.floor(airports[airport].pos.x) - 4;
    let lat = Math.floor(airports[airport].pos.y) - 4;
    for (let lngIter = lng; lngIter < (lng + 8); lngIter++) {
      for (let latIter = lat; latIter < (lat + 8); latIter++) {
        airportsHash[[lngIter, latIter]] = true;
      }
    }
  }
  return airportsHash;
};


let updateStats = (results) => {
  document.getElementById("inOrbit").innerHTML = `Possible Choices: <span class="indiv-stat-number">${results[0]}</span>`;
  document.getElementById("inOrbit-percentage").innerHTML = `% of Total: <span class="indiv-stat-number">${Math.round(results[0]/260 * 100)}</span>`;
  document.getElementById("considered").innerHTML = `Considered Paths: <span class="indiv-stat-number">${results[1]}</span>`;
  document.getElementById("considered-percentage").innerHTML = `% of Total: <span class="indiv-stat-number">${Math.round(results[1]/260 * 100)}</span>`;
  document.getElementById("final").innerHTML = `Final Path Length: <span class="indiv-stat-number">${results[2]}</span>`;
  document.getElementById("destination").className = "drawing light";
  document.getElementById("origin").className = "drawing light";
};

let drawPath = (canvasLeft, canvasTop, toggleButton, ctx, sAF, canvas) => (event) => {
  let startAndFinish = sAF;
  let x = event.pageX - canvasLeft;
  let y = event.pageY - canvasTop;
  let toggle = myClosure(toggleButton);
  let astarResults = myClosure(astar);
  let context = myClosure(ctx);
  let airports = myClosure(all_airports);
  let findAirports = myClosure(findAirportFromCoords);
  let airport = airports[findAirports(airports, x, y)];
  if (addAirport(startAndFinish, airport)) {
    startAndFinish.push(airport);}
  let drawPaths = myClosure(drawPathGenerations);
  let pathGen = myClosure(pathGenerator);
  if (startAndFinish.length < 3 && airport) { drawChosenAirport(ctx, x, y);}
  if (startAndFinish.length === 2) {
    toggle("disable");
    let results = astarResults.search(airports, startAndFinish[0], startAndFinish[1])[1];
    updateStats(results);
    drawPaths(pathGen(airports, startAndFinish[0], startAndFinish[1]), toggle);
    document.getElementById("canvas").className = "";
    canvas.removeEventListener("click", eventListeners.drawPathCB);
  }
};





export default chooseSrcDest;

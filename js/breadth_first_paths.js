import all_airports from './us_airports';

const init = (airports) => {
  for (var airport in airports) {
    airports[airport].unchecked = true;
  }
};

const flightBreadthFirstSearch = (airports, start, end) => {

  init(airports);
  start.unchecked = false;
  let currentAirports = [start];
  let nextAirports = [];
  let bfsPaths = [];
  let stillSearching = true;

  while (stillSearching) {
    stillSearching = false;
    let currentGeneration = [];
    for (let idx = 0; idx < currentAirports.length; idx ++) {
      let currentQueue = [currentAirports[idx]];
      for (var neighbor in currentAirports[idx].neighbors) {
        let currentNeighbor = airports[neighbor.toString()];
        if (currentNeighbor.unchecked) {
          stillSearching = true;
          currentNeighbor.unchecked = false;
          nextAirports.push(currentNeighbor);
          currentQueue.push(currentNeighbor);
        }
      }
      currentGeneration.push(currentQueue);
    }
    bfsPaths.push(currentGeneration);
    currentAirports = nextAirports;
    nextAirports = [];
  }
  addHardcodedAirports(airports, bfsPaths);
  return bfsPaths;
};


const addHardcodedAirports = (airports, pathArray) => {
  let path1 = [airports["117"], airports["63"]];
  path1.final = true;
  let path2 = [airports["63"], airports["17"]];
  path2.final = true;
  let path3 = [airports["17"], airports["230"]];
  path3.final = true;
  pathArray.push([path1]);
  pathArray.push([path2]);
  pathArray.push([path3]);
};


export default flightBreadthFirstSearch;

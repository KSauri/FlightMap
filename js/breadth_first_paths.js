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
  return bfsPaths;
};

export default flightBreadthFirstSearch;

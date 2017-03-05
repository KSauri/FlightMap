

const init = (airports) => {
  for (var airport in airports) {
    airports[airport].checked = false;
  }
};

const fligthBreadthFirstSearch = (airports, start) => {

  init(airports);

  let airportQueue = [start];

  for (var neighbor in start.neighbors) {
    neighbor.checked = true;
    airportQueue.push(neighbor);
  }

};

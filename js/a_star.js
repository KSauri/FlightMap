import PriorityQueue from './priority_queue';


const generateFinalPath = (endingAirport) => {
  let finalPath = [];
  let finalPathAirport = endingAirport;
  while (finalPathAirport.parent) {
    let pathGeneration = [];
    pathGeneration.final = true;
    pathGeneration.unshift(finalPathAirport);
    pathGeneration.unshift(finalPathAirport.parent);
    finalPath.unshift(pathGeneration);
    finalPathAirport = finalPathAirport.parent;
  }
  return finalPath;
};

const astar = {
    init: function(airports) {
        for (let airport in airports) {
          airports[airport].f = 0;
          airports[airport].g = 0;
          airports[airport].g = 0;
          airports[airport].h = 0;
          airports[airport].final = false;
          airports[airport].visited = false;
          airports[airport].closed = false;
          airports[airport].parent = null;
        }
    },
    heap: function() {
        return PriorityQueue();
    },
    search: function(airports, start, end) {
        astar.init(airports);
        let heuristic = astar.pythagoreanDis;
        let openHeap = astar.heap();
        start.f = 100000000000;
        openHeap.push(start);
        let inOrbit = 0;
        let considered = 0;
        let chosen = 0;
        let paths = [];
        while(openHeap.length > 0) {


            let currentAirport = openHeap.shift();
            considered ++;
            paths.push([currentAirport]);

            if(currentAirport === end) {
              let finalPath = generateFinalPath(currentAirport);
              chosen = finalPath.length;
              return [paths.concat(finalPath), [inOrbit, considered, chosen]];
            }

            currentAirport.closed = true;

            let neighbors = currentAirport.neighbors;
            for(let neighbor in neighbors) {
                let neighborAirport = airports[neighbor];
                neighborAirport.cost = neighbors[neighbor];
                if(neighborAirport.closed) {
                    continue;
                }
                paths[paths.length - 1].push(neighborAirport);
                let gScore = currentAirport.g + neighborAirport.cost;
                let beenVisited = neighborAirport.visited;

                if(!beenVisited || gScore < neighborAirport.g) {

                    neighborAirport.visited = true;
                    neighborAirport.parent = currentAirport;
                    neighborAirport.h = neighborAirport.h || heuristic(neighborAirport.pos, end.pos);
                    neighborAirport.g = gScore;
                    neighborAirport.f = neighborAirport.g + neighborAirport.h;

                    if (!beenVisited) {
                      inOrbit ++;
                      openHeap.push(neighborAirport);
                    }
                    else {
                      openHeap.rescoreElement(neighborAirport);
                    }
                }
            }
        }

        return [];
    },
    pythagoreanDis: (pos0, pos1) => {
      var d1 = Math.abs(pos1.x - pos0.x);
      var d2 = Math.abs(pos1.y - pos0.y);
      return Math.sqrt(Math.pow(d1,2) + Math.pow(d2,2));
    }
};

export default astar;




// pythagoreanDis: function(pos0, pos1) {
//     let d1 = Math.abs(pos1.x - pos0.x);
//     let d2 = Math.abs(pos1.y - pos0.y);
//     return d1 + d2;
// }

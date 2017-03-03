import PriorityQueue from './priority_queue';

const astar = {
    init: function(airports) {
        for (var airport in airports) {
          airports[airport].f = 0;
          airports[airport].g = 0;
          airports[airport].g = 0;
          airports[airport].h = 0;
          airports[airport].visited = false;
          airports[airport].closed = false;
          airports[airport].parent = null;
        }
    },
    heap: function() {
        return PriorityQueue();
    },
    search: function(airports, start, end, diagonal, heuristic) {
        astar.init(airports);
        heuristic = heuristic || astar.manhattan;
        diagonal = !!diagonal;
        var openHeap = astar.heap();
        start.f = 100000000000;
        openHeap.push(start);
        let paths = [];
        while(openHeap.length > 0) {

            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var currentAirport = openHeap.shift();
            paths.push([currentAirport]);
            // End case -- result has been found, return the traced path.
            if(currentAirport === end) {
                return paths;
            }

            // Normal case -- move currentAirport from open to closed, process each of its neighbors.
            currentAirport.closed = true;
            // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
            var neighbors = currentAirport.neighbors;
            for(var neighbor in neighbors) {
                let neighborAirport = airports[neighbor];
                neighborAirport.cost = neighbors[neighbor];
                if(neighborAirport.closed) {
                    
                    continue;
                }
                paths[paths.length - 1].push(neighborAirport);
                var gScore = currentAirport.g + neighborAirport.cost;
                var beenVisited = neighborAirport.visited;

                if(!beenVisited || gScore < neighborAirport.g) {

                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    neighborAirport.visited = true;
                    neighborAirport.parent = currentAirport;
                    neighborAirport.h = neighborAirport.h || heuristic(neighborAirport.pos, end.pos);
                    neighborAirport.g = gScore;
                    neighborAirport.f = neighborAirport.g + neighborAirport.h;

                    if (!beenVisited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(neighborAirport);
                    }
                    else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.rescoreElement(neighborAirport);
                    }
                }
            }
        }

        // No result was found - empty array signifies failure to find path.
        return [];
    },
    manhattan: function(pos0, pos1) {
        // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

        var d1 = Math.abs (pos1.x - pos0.x);
        var d2 = Math.abs (pos1.y - pos0.y);
        return d1 + d2;
    }
};

export default astar;

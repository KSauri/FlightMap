/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const airports = {
  A: {
    id: 1,
    neighbors: {
      B: 3,
      F: 5,
      E: 9
    },
    pos: {
      x: 50,
      y: 200}
  },
  B: {
    id: 2,
    neighbors: {
      C: 6,
      A: 3,
      E: 9
    },
    pos: {
      x: 100,
      y: 100}
  },
  C: {
    id: 3,
    neighbors: {
      B: 6,
      D: 8
    },
    pos: {
      x: 250,
      y: 50}
    },
  D: {
    id: 4,
    neighbors: {
      E: 1,
      C: 8
    },
    pos: {
      x: 300,
      y: 180}
  },
  E: {
    id: 5,
    neighbors: {
      A: 9,
      F: 9,
      D: 1,
      B: 9
    },
    pos: {
      x: 280,
      y: 240}
  },
  F: {
    id: 6,
    neighbors: {
      E: 9,
      A: 5
    },
    pos: {
      x: 120,
      y: 330}
  }
};

/* harmony default export */ __webpack_exports__["a"] = airports;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__priority_queue__ = __webpack_require__(3);


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
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__priority_queue__["a" /* default */])();
    },
    search: function(airports, start, end, diagonal, heuristic) {
        astar.init(airports);
        heuristic = heuristic || astar.manhattan;
        diagonal = !!diagonal;
        var openHeap = astar.heap();
        start.f = 100000000000;
        openHeap.push(start);
        let paths = {};
        let pathCount = 0;
        while(openHeap.length > 0) {

            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            pathCount ++;
            var currentAirport = openHeap.shift();
            paths[pathCount] = [currentAirport];
            // End case -- result has been found, return the traced path.
            if(currentAirport === end) {

                // var curr = currentAirport;
                // var ret = [];
                // while(curr.parent) {
                //     ret.push(curr);
                //     curr = curr.parent;
                // }
                // return ret.reverse();
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
                    // Not a valid node to process, skip to next neighbor.
                    continue;
                }
                paths[pathCount].push(neighborAirport);
                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
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

/* harmony default export */ __webpack_exports__["a"] = astar;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__airports__ = __webpack_require__(0);





const drawAirports = () => {

  var canvas = document.getElementById('canvas');
  canvas.width = 800;
  canvas.height = 500;
  var ctx = canvas.getContext('2d');


  for (var airport in __WEBPACK_IMPORTED_MODULE_0__airports__["a" /* default */]) {
    ctx.beginPath();
    ctx.arc(__WEBPACK_IMPORTED_MODULE_0__airports__["a" /* default */][airport].pos.x, __WEBPACK_IMPORTED_MODULE_0__airports__["a" /* default */][airport].pos.y, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
};

/* harmony default export */ __webpack_exports__["a"] = drawAirports;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function PriorityQueue(compare, queue) {
  if (!(this instanceof PriorityQueue)) return new PriorityQueue(compare, queue);

  compare = compare || min_first;
  queue   = queue   || [];

  function swap(i, j) {
    var t = queue[i];
    queue[i] = queue[j];
    queue[j] = t;
  }

  function heapify(i) {
    var length = queue.length, x, l, r;
    while (true) {
      x = i; l = left(i); r = right(i);
      if (l < length && compare(queue[l], queue[x]) < 0) x = l;
      if (r < length && compare(queue[r], queue[x]) < 0) x = r;
      if (x === i) break;
      swap(i, x);
      i = x;
    }
  }

  function remove(i) {
    var t = queue[i], b = queue.pop();
    if (queue.length > 0) {
      queue[i] = b;
      heapify(i);
    }
    return t;
  }

  this.peek = () => {
    return queue[0];
  };

  // this.deleteAt = (idx) => {
  //   remove(idx);
  // };


  this.push = function push(/* element, ... */) {
    var i = queue.length, e = i + arguments.length, j, p;
    queue.push.apply(queue, arguments);
    for (; i < e; ++i) {
      j = i; p = parent(i);
      for (; j > 0 && compare(queue[j], queue[p]) < 0; j = p, p = parent(j)) {
        swap(j, p);
      }
    }
    return queue.length;
  };

  this.rescoreElement = (elToChange) => {
    oldElIndex = queue.findIndex((el) => {
      return el.id === elToChange.id;
    });
    console.log(oldElIndex);
    remove(oldElIndex);
    this.push(elToChange);
  };

  this.shift = function shift() { return remove(0); };
  this.__defineGetter__('length', function length() { return queue.length; });

  for (var i = parent(queue.length - 1); i >= 0; --i) { heapify(i); }
}

function left(i)   { return 2 * i + 1; }
function right(i)  { return 2 * i + 2; }
function parent(i) { return Math.floor((i + 1) / 2) - 1; }


function min_first(a, b) { return a.f - b.f; }


/* harmony default export */ __webpack_exports__["a"] = PriorityQueue;









//


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_a_star__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_airports__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_sand_box__ = __webpack_require__(2);




window.astar = __WEBPACK_IMPORTED_MODULE_0__js_a_star__["a" /* default */];
window.airports = __WEBPACK_IMPORTED_MODULE_1__js_airports__["a" /* default */];



__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__js_sand_box__["a" /* default */])();


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__priority_queue__ = __webpack_require__(6);


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

/* harmony default export */ __webpack_exports__["a"] = astar;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const drawLineSegment = (pos, idx) => {
  ctx.beginPath();
  ctx.moveTo(pos[idx - 1].x, pos[idx - 1].y);
  ctx.lineTo(pos[idx].x, pos[idx].y);
  ctx.stroke();
  ctx.closePath();
};

function animate(total, ptsArr, idx, subidx, cb) {
    const reAnimate = () => {
      animate(total, ptsArr, idx, subidx, cb);
    };
    if (total < ptsArr[idx][subidx].length - 1) {
        requestAnimationFrame(reAnimate);
    } else {
      idx ++;
      if (cb !== undefined) { cb(ptsArr, idx); }
      return;
    }
    drawLineSegment(ptsArr[idx][subidx], total);
    total++;
}


const drawPathGenerations = (pathGens, generation = 0) => {
  if (generation === pathGens.length) { return; }
  for (var path = 0; path < pathGens[generation].length - 1; path++) {
    animate(1, pathGens, generation, path); // only one path calls drawPathGenerations to draw the next gen
  }
  let curr = pathGens[generation].length - 1;
  animate(1, pathGens, generation, curr, drawPathGenerations);
};



/* harmony default export */ __webpack_exports__["a"] = drawPathGenerations;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calc_waypoints__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__a_star__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__airports__ = __webpack_require__(0);






let paths = [];
let pathGenerations = __WEBPACK_IMPORTED_MODULE_1__a_star__["a" /* default */].search(__WEBPACK_IMPORTED_MODULE_2__airports__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__airports__["a" /* default */].A, __WEBPACK_IMPORTED_MODULE_2__airports__["a" /* default */].D);

for (var pathGen = 0; pathGen < pathGenerations.length - 1; pathGen++) {
  paths.push([]);
  for (var airport = 1; airport < pathGenerations[pathGen].length; airport++) {
    let wayPoints = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__calc_waypoints__["a" /* default */])([pathGenerations[pathGen][0].pos,
      pathGenerations[pathGen][airport].pos]);
    paths[pathGen]
      .push(wayPoints);
  }
}

/* harmony default export */ __webpack_exports__["a"] = paths;










//


/***/ }),
/* 4 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /Users/allannist/Documents/App_Academy/job_search/FlightMapping/js/sand_box.js Unexpected token (23:358)\nYou may need an appropriate loader to handle this file type.\n| \n| \n| ['\"ATL\"','\"LAX\"','\"ORD\"','\"DFW\"','\"JFK\"','\"DEN\"','\"SFO\"','\"CLT\"','\"LAS\"','\"PHX\"','\"MIA\"','\"IAH\"','\"SEA\"','\"MCO\"','\"EWR\"','\"MSP\"','\"BOS\"','\"DTW\"','\"PHL\"','\"LGA\"','\"FLL\"','\"BWI\"','\"DCA\"','\"MDW\"','\"SLC\"','\"IAD\"','\"SAN\"','\"HNL\"','\"TPA\"','\"PDX\"','\"DAL\"','\"STL\"','\"HOU\"','\"AUS\"','\"BNA\"','\"OAK\"','\"MSY\"','\"MCI\"','\"RDU\"','\"SNA\"','\"SJC\"','\"SMF\"','\"SJU\"','\"RSW\"',\"SAT\"'\"CLE\"','\"PIT\"','\"IND\"','\"CMH\"','\"MKE\"','\"OGG\"','\"PBI\"','\"CVG\"','\"BDL\"','\"JAX\"','\"ANC\"','\"BUF\"','\"ABQ\"','\"ONT\"','\"OMA\"','\"BUR\"','\"MEM\"','\"OKC\"','\"PVD\"','\"RIC\"','\"CHS\"','\"RNO\"','\"SDF\"','\"TUS\"','\"GEG\"','\"ORF\"','\"LIH\"','\"BOI\"','\"KOA\"','\"GUM\"','\"ELP\"','\"TUL\"','\"BHM\"','\"GRR\"','\"ALB\"','\"LGB\"','\"SFB\"','\"ROC\"','\"DSM\"','\"DAY\"','\"MHT\"','\"SYR\"','\"SAV\"','\"LIT\"','\"GSP\"','\"PSP\"','\"MYR\"','\"PWM\"','\"TYS\"','\"GSO\"','\"MSN\"','\"PIE\"','\"PNS\"','\"ICT\"','\"CAK\"','\"HPN\"','\"STT\"','\"FAT\"','\"IWA\"','\"XNA\"','\"ITO\"','\"SRQ\"','\"LEX\"','\"ISP\"','\"COS\"','\"ACY\"','\"MDT\"','\"BTV\"','\"CID\"','\"CAE\"','\"HSV\"','\"MAF\"','\"BZN\"','\"JAN\"','\"FSD\"','\"FAI\"','\"GSN\"','\"SGF\"','\"EUG\"','\"BLI\"','\"LBB\"','\"FAR\"','\"ECP\"','\"PGD\"','\"BIL\"','\"FNT\"','\"JNU\"','\"CHA\"','\"AVL\"','\"MFE\"','\"TTN\"','\"ILM\"','\"VPS\"','\"MFR\"','\"MLI\"','\"BTR\"','\"EYW\"','\"FWA\"','\"MSO\"','\"PSC\"','\"AMA\"','\"CRP\"','\"TLH\"','\"GCN\"','\"ABE\"','\"PIA\"','\"GPT\"','\"SBA\"','\"SBN\"','\"JAC\"','\"DAB\"','\"ROA\"','\"SHV\"','\"GRB\"','\"RDM\"','\"MOB\"','\"CHO\"','\"BGR\"','\"AGS\"','\"RAP\"','\"BIS\"','\"HRL\"','\"ATW\"','\"LFT\"','\"GPI\"','\"BVU\"','\"ASE\"','\"CRW\"','\"MLB\"','\"FAY\"','\"AVP\"','\"TRI\"','\"GJT\"','\"GNV\"','\"TVC\"','\"EVV\"','\"BQN\"','\"PHF\"','\"DRO\"','\"BMI\"','\"GTF\"','\"MOT\"','\"LBE\"','\"LAN\"','\"MRY\"','\"GRK\"','\"STX\"','\"MGM\"','\"LNK\"','\"AEX\"','\"BET\"','\"EGE\"','\"ACK\"','\"ELM\"','\"OAJ\"','\"IDA\"','\"GFK\"','\"SBP\"','\"BRO\"','\"SWF\"','\"UNV\"','\"PBG\"','\"DLH\"','\"STS\"','\"CWA\"','\"KTN\"','\"AZO\"','\"IAG\"','\"BFL\"','\"MBS\"','\"RST\"','\"MLU\"','\"LRD\"','\"EWN\"','\"IFP\"','\"RFD\"','\"CPR\"','\"MTJ\"','\"ISN\"','\"HTS\"','\"HLN\"','\"PSE\"','\"ENA\"','\"LSE\"','\"TOL\"','\"HDN\"','\"SPI\"','\"MKK\"','\"CLL\"','\"CMI\"','\"ERI\"','\"ITH\"','\"ABI\"','\"FSM\"','\"LCK\"','\"ADQ\"','\"SIT\"','\"SCK\"','\"NYL\"','\"BGM\"','\"SCC\"','\"LYH\"','\"SAF\"','\"JQF\"','\"TYR\"','\"VQS\"','\"SGU\"','\"LCH\"','\"SUN\"','\"FLG\"','\"LWS\"','\"OTZ\"','\"YNG\"','\"MHK\"','\"PPG\"','\"HYA\"','\"PVU\"','\"COU\"','\"GRI\"','\"SJT\"','\"YKM\"','\"ACT\"','\"EAT\"','\"SBY\"','\"OME\"','\"ORH\"','\"ACV\"','\"PGV\"','\"HND\"','\"FLO\"','\"LAW\"','\"CSG\"','\"PUW\"','\"MVY\"','\"BRW\"','\"TNI\"','\"DHN\"','\"PSM\"','\"SPS\"','\"SMX\"','\"RVR\"','\"SAW\"','\"DIK\"','\"ALW\"','\"HOM\"','\"LNY\"','\"VLD\"','\"GTR\"','\"HXD\"','\"DBQ\"','\"AKN\"','\"ROW\"','\"TXK\"']\n| ");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const calcWaypoints = (verts) => {
    var waypoints = [];
    for (var i = 1; i < verts.length; i++) {
        var pt0 = verts[i - 1];
        var pt1 = verts[i];
        var dx = pt1.x - pt0.x;
        var dy = pt1.y - pt0.y;
        for (var j = 0; j < 100; j++) {
            var x = pt0.x + dx * j / 100;
            var y = pt0.y + dy * j / 100;
            waypoints.push({
                x: x,
                y: y
            });
        }
    }
    return (waypoints);
};

/* harmony default export */ __webpack_exports__["a"] = calcWaypoints;


/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_a_star__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_airports__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_sand_box__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_sand_box___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__js_sand_box__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_draw_paths__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__js_generate_paths__ = __webpack_require__(3);







__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__js_sand_box__["default"])();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__js_draw_paths__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_4__js_generate_paths__["a" /* default */]);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
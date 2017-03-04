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
/* 0 */,
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
  ctx.moveTo(pos[idx - 1].y, pos[idx - 1].x);
  ctx.lineTo(pos[idx].y, pos[idx].x);
  ctx.strokeStyle = "red";
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__us_airports__ = __webpack_require__(8);





let start = __WEBPACK_IMPORTED_MODULE_2__us_airports__["a" /* default */]["4"];
let end = __WEBPACK_IMPORTED_MODULE_2__us_airports__["a" /* default */]["147"];

let paths = [];
let pathGenerations = __WEBPACK_IMPORTED_MODULE_1__a_star__["a" /* default */].search(__WEBPACK_IMPORTED_MODULE_2__us_airports__["a" /* default */], start, end);

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__us_airports__ = __webpack_require__(8);



const drawAirports = () => {

  var canvas = document.getElementById('canvas');
  canvas.width = 1000;
  canvas.height = 700;
  var ctx = canvas.getContext('2d');

  for (var airport in __WEBPACK_IMPORTED_MODULE_0__us_airports__["a" /* default */]) {
    if (airport === "size") { continue; }
    ctx.beginPath();
    let y = __WEBPACK_IMPORTED_MODULE_0__us_airports__["a" /* default */][airport].pos.x;
    let x = __WEBPACK_IMPORTED_MODULE_0__us_airports__["a" /* default */][airport].pos.y;
    ctx.arc(x,y, 2.5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = '#2C5581';
    ctx.fill();
  }
};

/* harmony default export */ __webpack_exports__["a"] = drawAirports;


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
            var x = Math.floor(pt0.x + dx * j / 100);
            var y = Math.floor(pt0.y + dy * j / 100);
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
    let oldElIndex = queue.findIndex((el) => {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_sand_box__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_draw_paths__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_generate_paths__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_us_airports__ = __webpack_require__(8);
// import astar from './js/a_star';
// import airports from './js/airports';





window.all_airports = __WEBPACK_IMPORTED_MODULE_3__js_us_airports__["a" /* default */];

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_sand_box__["a" /* default */])();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__js_draw_paths__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__js_generate_paths__["a" /* default */]);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let us_airports = {"city":{"1":"Fort Smith","2":"Grand Forks","3":"Trenton","4":"Boston","5":"Oakland","6":"Omaha","7":"Kahului","8":"Wichita","9":"Kansas City","10":"Madison","11":"Phoenix","12":"Bangor","13":"Spokane","14":"San Francisco","15":"Gainesville","16":"Memphis","17":"Los Angeles","18":"Cincinnati","19":"Juneau","20":"Lafayette","21":"Newark","22":"Boise","23":"Minot","24":"Dallas","25":"Helena","26":"Lake Charles","27":"Kona","28":"Myrtle Beach","29":"Nantucket","30":"Washington","31":"Atlantic City","32":"Kodiak","33":"Fort Lauderdale","34":"Salt Lake City","35":"Harrisburg","36":"Lincoln","37":"Lansing","38":"Houston","39":"Bakersfield","40":"El Paso","41":"Harlingen","42":"Columbia","43":"Pensacola","44":"Houston","45":"Pittsburgh","46":"Barrow","47":"Miami","48":"Seattle","49":"Chattanooga","50":"Jackson","51":"Long Beach","52":"Indianapolis","53":"White Plains","54":"Duluth","55":"Bethel","56":"Lihue","57":"Richmond","58":"Shreveport","59":"Norfolk","60":"Savannah","61":"Nome","62":"St. Petersburg","63":"Deadhorse","64":"Rochester","65":"Raleigh-durham","66":"Dayton","67":"Kenai","68":"Niagara Falls","69":"Newport News","70":"Tucson","71":"Providence","72":"Salisbury","73":"Burbank","74":"Detroit","75":"Tampa","76":"Midland","77":"Green Bay","78":"Bush Field","79":"Williston","80":"Little Rock","81":"Newburgh","82":"Homer","83":"Dallas-Fort Worth","84":"Melbourne","85":"Austin","86":"Columbus","87":"Knoxville","88":"St. Louis","89":"Wichita Falls","90":"Atlanta","91":"Grand Rapids","92":"Fresno","93":"Nashville","94":"Laredo","95":"Kotzebue","96":"New York","97":"Tallahassee","98":"Waco","99":"Molokai","100":"San Angelo","101":"Burlington","102":"Jacksonville","103":"Durango","104":"Washington","105":"College Station","106":"Milwaukee","107":"Abilene","108":"Columbia","109":"Portland","110":"West Palm Beach","111":"Honolulu","112":"Des Moines","113":"New Bern","114":"San Diego","115":"Monroe","116":"Ontario","117":"Roswell","118":"Brownsville","119":"Dothan","120":"Corpus Christi","121":"Syracuse","122":"Chicago","123":"San Jose","124":"Denver","125":"Philadelphia","126":"Columbus","127":"Texarkana","128":"Plattsburgh","129":"Anchorage","130":"Killeen","131":"Bellingham","132":"Mobile","133":"Santa Fe","134":"Fort Myers","135":"King Salmon","136":"New York","137":"Stockton","138":"Charleston","139":"Reno","140":"Ketchikan","141":"Birmingham","142":"Sacramento","143":"Colorado Springs","144":"Buffalo","145":"Windsor Locks","146":"Mcallen","147":"Lubbock","148":"Chicago","149":"Fairbanks","150":"Palm Springs","151":"Amarillo","152":"Wilmington","153":"Tyler","154":"Baltimore","155":"Lanai","156":"Alexandria","157":"Tulsa","158":"Sitka","159":"Islip","160":"Minneapolis","161":"New Orleans","162":"Portland","163":"Oklahoma City","164":"Albany","165":"Santa Ana","166":"Casper","167":"Valparaiso","168":"Key West","169":"Charlotte","170":"Las Vegas","171":"Orlando","172":"Florence","173":"Great Falls","174":"Youngstown","175":"Pullman","176":"Lewiston","177":"Elmira","178":"Ithaca","179":"Monterey","180":"Santa Barbara","181":"Daytona Beach","182":"Asheville","183":"Greensboro","184":"Sioux Falls","185":"Manchester NH","186":"Louisville","187":"Charlottesville VA","188":"Roanoke VA","189":"Lexington KY","190":"Evansville","191":"Albuquerque","192":"Bozeman","193":"Billings","194":"Traverse City","195":"Jacksn Hole","196":"Rockford","197":"Greenville","198":"Bloomington","199":"Gulfport","200":"Kalamazoo","201":"Toledo","202":"Fort Wayne","203":"Cedar Rapids","204":"La Crosse","205":"Wassau","206":"Peoria","207":"Appleton","208":"Rochester","209":"Champaign","210":"Manhattan","211":"Grand Junction","212":"Saint George","213":"Sarasota","214":"Moline","215":"Bismarck","216":"Rapid City","217":"Flint","218":"Eugene","219":"Idaho Falls","220":"Medford","221":"Redmond-Bend","222":"Akron","223":"Huntsville","224":"MONTGOMERY","225":"BRISTOL","226":"Saginaw","227":"Binghamton","228":"Sanford","229":"Missoula","230":"Grand Canyon","231":"Vail","232":"Columbus","233":"Lawton","234":"Flagstaff","235":"Vineyard Haven MA","236":"Columbus Mississippi","237":"Erie","238":"Barnstable","239":"Charleston","240":"Scranton","241":"Fargo","242":"Springfield","243":"Hayden","244":"Springfield","245":"Allentown","246":"Bentonville","247":"South Bend","248":"Arcata CA","249":"Jacksonville NC","250":"Dubuque IA","251":"Walla Walla","252":"Fayetteville","253":"Grand Island","254":"Huntington","255":"Latrobe","256":"Lynchburg","257":"Portsmouth","258":"San Luis Obispo","259":"Santa Maria","260":"Valdosta","261":"Yakima","262":"Pasco","263":"Worcester","264":"Hailey","265":"Montrose CO","266":"Wenatchee","267":"Greenville","268":"Santa Rosa","269":"Aspen","270":"Punta Gorda","271":"Dickinson","272":"Provo","273":"Panama City"},"threeLetterName":{"1":"FSM","2":"GFK","3":"TTN","4":"BOS","5":"OAK","6":"OMA","7":"OGG","8":"ICT","9":"MCI","10":"MSN","11":"PHX","12":"BGR","13":"GEG","14":"SFO","15":"GNV","16":"MEM","17":"LAX","18":"CVG","19":"JNU","20":"LFT","21":"EWR","22":"BOI","23":"MOT","24":"DAL","25":"HLN","26":"LCH","27":"KOA","28":"MYR","29":"ACK","30":"DCA","31":"ACY","32":"ADQ","33":"FLL","34":"SLC","35":"MDT","36":"LNK","37":"LAN","38":"IAH","39":"BFL","40":"ELP","41":"HRL","42":"CAE","43":"PNS","44":"HOU","45":"PIT","46":"BRW","47":"MIA","48":"SEA","49":"CHA","50":"JAN","51":"LGB","52":"IND","53":"HPN","54":"DLH","55":"BET","56":"LIH","57":"RIC","58":"SHV","59":"ORF","60":"SAV","61":"OME","62":"PIE","63":"SCC","64":"ROC","65":"RDU","66":"DAY","67":"ENA","68":"IAG","69":"PHF","70":"TUS","71":"PVD","72":"SBY","73":"BUR","74":"DTW","75":"TPA","76":"MAF","77":"GRB","78":"AGS","79":"ISN","80":"LIT","81":"SWF","82":"HOM","83":"DFW","84":"MLB","85":"AUS","86":"LCK","87":"TYS","88":"STL","89":"SPS","90":"ATL","91":"GRR","92":"FAT","93":"BNA","94":"LRD","95":"OTZ","96":"LGA","97":"TLH","98":"ACT","99":"MKK","100":"SJT","101":"BTV","102":"JAX","103":"DRO","104":"IAD","105":"CLL","106":"MKE","107":"ABI","108":"COU","109":"PDX","110":"PBI","111":"HNL","112":"DSM","113":"EWN","114":"SAN","115":"MLU","116":"ONT","117":"ROW","118":"BRO","119":"DHN","120":"CRP","121":"SYR","122":"MDW","123":"SJC","124":"DEN","125":"PHL","126":"CMH","127":"TXK","128":"PBG","129":"ANC","130":"GRK","131":"BLI","132":"MOB","133":"SAF","134":"RSW","135":"AKN","136":"JFK","137":"SCK","138":"CHS","139":"RNO","140":"KTN","141":"BHM","142":"SMF","143":"COS","144":"BUF","145":"BDL","146":"MFE","147":"LBB","148":"ORD","149":"FAI","150":"PSP","151":"AMA","152":"ILM","153":"TYR","154":"BWI","155":"LNY","156":"AEX","157":"TUL","158":"SIT","159":"ISP","160":"MSP","161":"MSY","162":"PWM","163":"OKC","164":"ALB","165":"SNA","166":"CPR","167":"VPS","168":"EYW","169":"CLT","170":"LAS","171":"MCO","172":"FLO","173":"GTF","174":"YNG","175":"PUW","176":"LWS","177":"ELM","178":"ITH","179":"MRY","180":"SBA","181":"DAB","182":"AVL","183":"GSO","184":"FSD","185":"MHT","186":"SDF","187":"CHO","188":"ROA","189":"LEX","190":"EVV","191":"ABQ","192":"BZN","193":"BIL","194":"TVC","195":"JAC","196":"RFD","197":"GSP","198":"BMI","199":"GPT","200":"AZO","201":"TOL","202":"FWA","203":"CID","204":"LSE","205":"CWA","206":"PIA","207":"ATW","208":"RST","209":"CMI","210":"MHK","211":"GJT","212":"SGU","213":"SRQ","214":"MLI","215":"BIS","216":"RAP","217":"FNT","218":"EUG","219":"IDA","220":"MFR","221":"RDM","222":"CAK","223":"HSV","224":"MGM","225":"TRI","226":"MBS","227":"BGM","228":"SFB","229":"MSO","230":"GCN","231":"EGE","232":"CSG","233":"LAW","234":"FLG","235":"MVY","236":"GTR","237":"ERI","238":"HYA","239":"CRW","240":"AVP","241":"FAR","242":"SPI","243":"HDN","244":"SGF","245":"ABE","246":"XNA","247":"SBN","248":"ACV","249":"OAJ","250":"DBQ","251":"ALW","252":"FAY","253":"GRI","254":"HTS","255":"LBE","256":"LYH","257":"PSM","258":"SBP","259":"SMX","260":"VLD","261":"YKM","262":"PSC","263":"ORH","264":"SUN","265":"MTJ","266":"EAT","267":"PGV","268":"STS","269":"ASE","270":"PGD","271":"DIK","272":"PVU","273":"ECP"},"lat":{"1":"35.33660125732422","2":"47.949299","3":"40.27669906616211","4":"42.36429977","5":"37.72129821777344","6":"41.303199768066406","7":"20.89859962463379","8":"37.649898529052734","9":"39.2976","10":"43.13990020751953","11":"33.43429946899414","12":"44.80739974975586","13":"47.61989974975586","14":"37.61899948120117","15":"29.6900997162","16":"35.04240036010742","17":"33.94250107","18":"39.0488014221","19":"58.35499954223633","20":"30.20529938","21":"40.692501068115234","22":"43.56439972","23":"48.2593994140625","24":"32.84709930419922","25":"46.6068000793457","26":"30.126100540161133","27":"19.738800048828125","28":"33.6796989441","29":"41.25310135","30":"38.8521","31":"39.45759963989258","32":"57.75","33":"26.072599411010742","34":"40.78839874267578","35":"40.1935005188","36":"40.85100173950195","37":"42.77870178222656","38":"29.984399795532227","39":"35.43360138","40":"31.80719948","41":"26.228500366210938","42":"33.93880081176758","43":"30.473400115967","44":"29.64539909","45":"40.49150085","46":"71.285402","47":"25.79319953918457","48":"47.44900131225586","49":"35.035301208496094","50":"32.3111991882","51":"33.81769943","52":"39.7173","53":"41.06700134277344","54":"46.8420982361","55":"60.77980042","56":"21.97599983215332","57":"37.50519943237305","58":"32.44660186767578","59":"36.89459991455078","60":"32.12760162","61":"64.51219940185547","62":"27.91020012","63":"70.19470215","64":"43.118900299072266","65":"35.877601623535156","66":"39.902400970458984","67":"60.57310104370117","68":"43.1072998046875","69":"37.13190079","70":"32.1161003112793","71":"41.732601165771484","72":"38.34049987792969","73":"34.20069885253906","74":"42.212398529052734","75":"27.975500106811523","76":"31.9424991607666","77":"44.48509979248047","78":"33.36989974975586","79":"48.177898407","80":"34.729400634799994","81":"41.50410079956055","82":"59.645599365234375","83":"32.89680099487305","84":"28.102800369262695","85":"30.194499969482422","86":"39.813801","87":"35.81100082","88":"38.74869918823242","89":"33.98880005","90":"33.63669967651367","91":"42.88079834","92":"36.77619934082031","93":"36.1245002746582","94":"27.543800354003906","95":"66.88469696","96":"40.77719879","97":"30.396499633789062","98":"31.611299514770508","99":"21.15290069580078","100":"31.35770034790039","101":"44.471900939899996","102":"30.49410057067871","103":"37.1515007019","104":"38.94449997","105":"30.58860016","106":"42.947200775146484","107":"32.4113006592","108":"38.81809997558594","109":"45.58869934","110":"26.68320083618164","111":"21.318700790405273","112":"41.534000396728516","113":"35.0730018616","114":"32.7336006165","115":"32.51089859008789","116":"34.055999755859375","117":"33.30160140991211","118":"25.90679931640625","119":"31.321300506591797","120":"27.77039909362793","121":"43.11119842529297","122":"41.7859992980957","123":"37.36259841918945","124":"39.861698150635","125":"39.87189865112305","126":"39.99800109863281","127":"33.45370101928711","128":"44.650901794433594","129":"61.174400329589844","130":"31.067199707","131":"48.79280090332031","132":"30.691200256348","133":"35.617099762","134":"26.53619956970215","135":"58.67679977","136":"40.63980103","137":"37.894199371338","138":"32.89860153","139":"39.49909973144531","140":"55.35559845","141":"33.56290054","142":"38.69540023803711","143":"38.805801391602","144":"42.94049835","145":"41.9388999939","146":"26.17580032","147":"33.66360092163086","148":"41.97859955","149":"64.81510162","150":"33.8297004699707","151":"35.219398498535156","152":"34.270599365234375","153":"32.35409927368164","154":"39.17539978","155":"20.785600662231445","156":"31.32740020751953","157":"36.19839859008789","158":"57.04710006713867","159":"40.79520035","160":"44.881999969499994","161":"29.99340057373047","162":"43.64619827","163":"35.39310073852539","164":"42.74829864501953","165":"33.67570114","166":"42.90800095","167":"30.4832","168":"24.556100845336914","169":"35.2140007019043","170":"36.08010101","171":"28.429399490356445","172":"34.18539810180664","173":"47.48199844","174":"41.26070023","175":"46.7439","176":"46.3745002746582","177":"42.1599006652832","178":"42.49100112915039","179":"36.58700180053711","180":"34.42620087","181":"29.179899","182":"35.43619918823242","183":"36.097801208496094","184":"43.582000732400004","185":"42.93259811401367","186":"38.1744","187":"38.13859939575195","188":"37.325500488299994","189":"38.0364990234375","190":"38.0369987488","191":"35.040199279785156","192":"45.77750015","193":"45.807701110839844","194":"44.74140167236328","195":"43.6072998046875","196":"42.19540023803711","197":"34.8956985474","198":"40.47710037","199":"30.40730094909668","200":"42.234901428222656","201":"41.58679962","202":"40.97850037","203":"41.884700775146484","204":"43.879002","205":"44.7775993347","206":"40.664199829100006","207":"44.258098602299995","208":"43.90829849243164","209":"40.03919983","210":"39.14099884033203","211":"39.1223983765","212":"37.0363888889","213":"27.39539909362793","214":"41.44850158691406","215":"46.772701263427734","216":"44.0452995300293","217":"42.96540069580078","218":"44.12459945678711","219":"43.51459884643555","220":"42.37419891357422","221":"44.2541008","222":"40.916099548339844","223":"34.637199401855","224":"32.30059814","225":"36.47520065307617","226":"43.532901763916016","227":"42.20869827","228":"28.777599334716797","229":"46.91630173","230":"35.95240020751953","231":"39.64260101","232":"32.516300201416016","233":"34.5676994324","234":"35.13850021","235":"41.3931007385","236":"33.450298309299995","237":"42.0831270134","238":"41.66930008","239":"38.37310028076172","240":"41.338500976599995","241":"46.92070007324219","242":"39.84410095","243":"40.48120117","244":"37.24570084","245":"40.652099609375","246":"36.281898","247":"41.70869827270508","248":"40.97809982299805","249":"34.8292007446","250":"42.40200043","251":"46.09489822","252":"34.9911994934082","253":"40.967498779296875","254":"38.36669922","255":"40.27590179","256":"37.326698303222656","257":"43.0778999329","258":"35.236801147499996","259":"34.89889908","260":"30.782499313354492","261":"46.56819916","262":"46.26470184326172","263":"42.26729965209961","264":"43.50439835","265":"38.509799957300004","266":"47.3988990784","267":"35.6352005","268":"38.50899887","269":"39.22320175","270":"26.92020035","271":"46.7974014282","272":"40.219200134277","273":"30.357106"},"lng":{"1":"-94.36740112304688","2":"-97.176102","3":"-74.8134994506836","4":"-71.00520325","5":"-122.22100067138672","6":"-95.89409637451172","7":"-156.42999267578125","8":"-97.43309783935547","9":"-94.713898","10":"-89.3375015258789","11":"-112.01200103759766","12":"-68.8281021118164","13":"-117.53399658203125","14":"-122.375","15":"-82.2717971802","16":"-89.97669982910156","17":"-118.4079971","18":"-84.6678009033","19":"-134.5760040283203","20":"-91.98760223","21":"-74.168701171875","22":"-116.2229996","23":"-101.27999877929688","24":"-96.85179901123047","25":"-111.98300170898438","26":"-93.22329711914062","27":"-156.04600524902344","28":"-78.9282989502","29":"-70.06020355","30":"-77.037697","31":"-74.57720184326172","32":"-152.4940033","33":"-80.15270233154297","34":"-111.97799682617188","35":"-76.7633972168","36":"-96.75920104980469","37":"-84.58740234375","38":"-95.34140014648438","39":"-119.0569992","40":"-106.3779984","41":"-97.65440368652344","42":"-81.11949920654297","43":"-87.186599731445","44":"-95.27890015","45":"-80.23290253","46":"-156.766008","47":"-80.29060363769531","48":"-122.30899810791016","49":"-85.20379638671875","50":"-90.0758972168","51":"-118.1520004","52":"-86.294403","53":"-73.70760345458984","54":"-92.19360351559999","55":"-161.8379974","56":"-159.33900451660156","57":"-77.3197021484375","58":"-93.82559967041016","59":"-76.20120239257812","60":"-81.20210266","61":"-165.44500732421875","62":"-82.68740082","63":"-148.4649963","64":"-77.67240142822266","65":"-78.7874984741211","66":"-84.21939849853516","67":"-151.2449951171875","68":"-78.94619750976562","69":"-76.49299622","70":"-110.94100189208984","71":"-71.42040252685547","72":"-75.51029968261719","73":"-118.35900115966797","74":"-83.35340118408203","75":"-82.533203125","76":"-102.2020034790039","77":"-88.12960052490234","78":"-81.9645004272461","79":"-103.641998291","80":"-92.2242965698","81":"-74.10479736328125","82":"-151.4770050048828","83":"-97.03800201416016","84":"-80.64530181884766","85":"-97.6698989868164","86":"-82.927803","87":"-83.9940033","88":"-90.37000274658203","89":"-98.49189758","90":"-84.4281005859375","91":"-85.52279663","92":"-119.71800231933594","93":"-86.6781997680664","94":"-99.46160125732422","95":"-162.598999","96":"-73.87259674","97":"-84.35030364990234","98":"-97.23049926757812","99":"-157.0959930419922","100":"-100.49600219726562","101":"-73.15329742429999","102":"-81.68789672851562","103":"-107.753997803","104":"-77.45580292","105":"-96.36380005","106":"-87.89659881591797","107":"-99.68190002440001","108":"-92.21959686279297","109":"-122.5979996","110":"-80.09559631347656","111":"-157.9219970703125","112":"-93.66310119628906","113":"-77.04290008539999","114":"-117.190002441","115":"-92.0376968383789","116":"-117.60099792480469","117":"-104.53099822998047","118":"-97.4259033203125","119":"-85.44960021972656","120":"-97.5011978149414","121":"-76.1063003540039","122":"-87.75240325927734","123":"-121.92900085449219","124":"-104.672996521","125":"-75.24109649658203","126":"-82.89189910888672","127":"-93.99099731445312","128":"-73.46810150146484","129":"-149.99600219726562","130":"-97.82890319820001","131":"-122.53800201416016","132":"-88.242797851562","133":"-106.088996887","134":"-81.75520324707031","135":"-156.6490021","136":"-73.77890015","137":"-121.2379989624","138":"-80.04049683","139":"-119.76799774169922","140":"-131.7140045","141":"-86.75350189","142":"-121.59100341796875","143":"-104.70099639893","144":"-78.73220062","145":"-72.68319702149999","146":"-98.23860168","147":"-101.822998046875","148":"-87.90480042","149":"-147.8560028","150":"-116.50700378417969","151":"-101.70600128173828","152":"-77.90260314941406","153":"-95.40239715576172","154":"-76.66829681","155":"-156.9510040283203","156":"-92.54979705810547","157":"-95.88809967041016","158":"-135.36199951171875","159":"-73.10019684","160":"-93.22180175780001","161":"-90.25800323486328","162":"-70.30930328","163":"-97.60070037841797","164":"-73.80169677734375","165":"-117.8679962","166":"-106.4639969","167":"-86.525398","168":"-81.75959777832031","169":"-80.94309997558594","170":"-115.1520004","171":"-81.30899810791016","172":"-79.7238998413086","173":"-111.3710022","174":"-80.67910004","175":"-117.110001","176":"-117.01499938964844","177":"-76.8916015625","178":"-76.4583969116211","179":"-121.84300231933594","180":"-119.8399963","181":"-81.058098","182":"-82.54180145263672","183":"-79.93730163574219","184":"-96.741897583","185":"-71.43569946289062","186":"-85.736","187":"-78.4529037475586","188":"-79.975402832","189":"-84.60590362548828","190":"-87.5324020386","191":"-106.60900115966797","192":"-111.1529999","193":"-108.54299926757812","194":"-85.58219909667969","195":"-110.73799896240234","196":"-89.09719848632812","197":"-82.2189025879","198":"-88.91590118","199":"-89.07009887695312","200":"-85.5521011352539","201":"-83.80780029","202":"-85.19509888","203":"-91.71080017089844","204":"-91.256699","205":"-89.6668014526","206":"-89.6932983398","207":"-88.5190963745","208":"-92.5","209":"-88.27809906","210":"-96.6707992553711","211":"-108.527000427","212":"-113.510305556","213":"-82.55439758300781","214":"-90.50749969482422","215":"-100.74600219726562","216":"-103.05699920654297","217":"-83.74359893798828","218":"-123.21199798583984","219":"-112.07099914550781","220":"-122.87300109863281","221":"-121.1500015","222":"-81.44219970703125","223":"-86.775100708008","224":"-86.39399719","225":"-82.40740203857422","226":"-84.07959747314453","227":"-75.97979736","228":"-81.23750305175781","229":"-114.0910034","230":"-112.14700317382812","231":"-106.9179993","232":"-84.93890380859375","233":"-98.4166030884","234":"-111.6709976","235":"-70.6143035889","236":"-88.5914001465","237":"-80.1738667488","238":"-70.28040314","239":"-81.59320068359375","240":"-75.72339630130001","241":"-96.81580352783203","242":"-89.67790222","243":"-107.2180023","244":"-93.38860321","245":"-75.44080352783203","246":"-94.306801","247":"-86.31729888916016","248":"-124.10900115966797","249":"-77.61209869380001","250":"-90.70950317","251":"-118.288002","252":"-78.88030242919922","253":"-98.30960083007812","254":"-82.55799866","255":"-79.40480042","256":"-79.20040130615234","257":"-70.8233032227","258":"-120.641998291","259":"-120.4570007","260":"-83.27670288085938","261":"-120.5439987","262":"-119.11900329589844","263":"-71.87570190429688","264":"-114.2959976","265":"-107.893997192","266":"-120.207000732","267":"-77.38529968","268":"-122.8130035","269":"-106.8690033","270":"-81.9905014","271":"-102.802001953","272":"-111.72299957275","273":"-85.795414"}};

let all_airports = {};

const parseLat = (lat) => {
  let rightMinusLeft = -71.7979 + 128.3877;
  let answer = Math.abs(800 * (lat + 128.3877)/rightMinusLeft);
  return answer;
};

const parseLng = (lng) => {
  let topMinusBottom = 51.179910 - 21.6940;
  let answer = Math.abs(600 * (51.179910 - lng)/topMinusBottom);
  return answer;
};

Object.keys(us_airports.city).forEach((airportId) => {
  all_airports[airportId] = {};
  all_airports[airportId].id = airportId;
});

Object.keys(all_airports).forEach((airportId) => {
    all_airports[airportId].pos = {};
    let lat = parseFloat(us_airports.lat[airportId]);
    let canvasLat = parseLng(lat);
    all_airports[airportId].pos.x = canvasLat; });

Object.keys(us_airports.threeLetterName).forEach((airportId) => {
  all_airports[airportId].code = us_airports.threeLetterName[airportId];
});

Object.keys(all_airports).forEach((airportId) => {
    let lng = parseFloat(us_airports.lng[airportId]);
    let canvasLng = parseLat(lng);
    all_airports[airportId].pos.y = canvasLng; });

Object.keys(all_airports).forEach((airportId) => {
    all_airports[airportId].neighbors = {}; });

Object.keys(all_airports).forEach((airportId) => {
  for (var neighbor = 0; neighbor < 5; neighbor++) {
  }
});

const pythagoreanDis = (pos0, pos1) => {
  var d1 = Math.abs (pos1.x - pos0.x);
  var d2 = Math.abs (pos1.y - pos0.y);
  return Math.sqrt(Math.pow(d1,2) + Math.pow(d2,2));
};

const shuffle = (array) => {
    for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
};

const makeNeighbors = (airportOne, airportTwo) => {
  let dist = pythagoreanDis(airportOne.pos, airportTwo.pos);
  airportOne.neighbors[airportTwo.id] = dist;
  airportTwo.neighbors[airportOne.id] = dist;
};

const size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

const assignNeighbors = (airports) => {
  Object.keys(airports).forEach((airportOneId) => {
    if (size(airports[airportOneId].neighbors) < 2) {
      Object.keys(airports).forEach((airportTwoId) => {
        let dist = pythagoreanDis(airports[airportOneId].pos, airports[airportTwoId].pos);
        if (airportTwoId !== airportOneId && dist < 40) {
          makeNeighbors(airports[airportOneId], airports[airportTwoId]);
        }
      });
    }
  });
};

const assignIsolatedNeighbors = (airports) => {
  Object.keys(airports).forEach((airportOneId) => {
    if (size(airports[airportOneId].neighbors) < 1) {
      Object.keys(airports).forEach((airportTwoId) => {
        let dist = pythagoreanDis(airports[airportOneId].pos, airports[airportTwoId].pos);
        if (airportTwoId !== airportOneId && dist < 50) {
          makeNeighbors(airports[airportOneId], airports[airportTwoId]);
        }
      });
    }
  });
};

assignNeighbors(all_airports);
assignIsolatedNeighbors(all_airports);


/* harmony default export */ __webpack_exports__["a"] = all_airports;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
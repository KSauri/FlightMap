var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 500;
var ctx = canvas.getContext('2d');
var raf;

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        },
        timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
}());


ctx.beginPath();
ctx.arc(200, 200, 5, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fillStyle = this.color;
ctx.fill();
ctx.beginPath();
ctx.arc(50, 50, 5, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fillStyle = this.color;
ctx.fill();
ctx.beginPath();
ctx.arc(100, 75, 5, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fillStyle = this.color;
ctx.fill();
ctx.beginPath();
ctx.arc(25, 5, 5, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fillStyle = this.color;
ctx.fill();
ctx.arc(250, 400, 5, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fillStyle = this.color;
ctx.fill();


ctx.lineCap = "round";


var t = 1;

// define the path to plot
var vertices = [];
vertices.push({
    x: 50,
    y: 50
});
vertices.push({
    x: 200,
    y: 200
});
let vertices2 = [];
vertices2.push({
    x: 50,
    y: 50
});
vertices2.push({
    x: 100,
    y: 75
});
let vertices3 = [];
vertices3.push({
    x: 25,
    y: 5
});
vertices3.push({
    x: 100,
    y: 75
});
let vertices4 = [];
vertices4.push({
    x: 200,
    y: 200
});
vertices4.push({
    x: 250,
    y: 400
});


// draw the complete line
ctx.lineWidth = 1;
// tell canvas you are beginning a new path
ctx.beginPath();
// draw the path with moveTo and multiple lineTo's
ctx.moveTo(0, 0);
ctx.lineTo(300, 100);
ctx.lineTo(80, 200);
ctx.lineTo(10, 100);
ctx.lineTo(0, 0);
// stroke the path
// ctx.stroke();


// set some style
ctx.lineWidth = 2;
ctx.strokeStyle = "blue";
// calculate incremental points along the path
var points = calcWaypoints(vertices);
let points2 = calcWaypoints(vertices2);
let points3 = calcWaypoints(vertices3);
let points4 = calcWaypoints(vertices4);
let max = Math.max(points.length, points2.length, points3.length);
// extend the line from start to finish with animation
// animate(points);


// calc waypoints traveling along vertices
function calcWaypoints(verts) {
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
}



function animatePr(total, pts, maxVal, nextFun, pts2) {
    const reAnimate = () => {
      animatePr(total, pts, maxVal, nextFun, pts2);
    };
    if (total < pts.length - 1) {
        requestAnimationFrame(reAnimate);
    }
    // draw a line segment from the last waypoint
    // to the current waypoint
    ctx.beginPath();
    ctx.moveTo(pts[total - 1].x, pts[total - 1].y);

    ctx.lineTo(pts[total].x, pts[total].y);
    ctx.stroke();
    ctx.closePath();
    // increment "t" to get the next waypoint
    console.log(total);
    total++;
    if (total === (maxVal - 2)) {
      nextFun(1, pts2);
    }
}

let animateCB = (cb, t, points) => {
  cb(t, points);
};

function animate(total, ptsArr, idx, subidx, cb) {
    const reAnimate = () => {
      animate(total, ptsArr, idx, subidx, cb);
    };
    if (total < ptsArr[idx][subidx].length - 1) {
        requestAnimationFrame(reAnimate);
    } else {
      idx ++;
      cb(ptsArr, idx);
    }
    ctx.beginPath();
    ctx.moveTo(ptsArr[idx][subidx][total - 1].x, ptsArr[idx][subidx][total - 1].y);

    ctx.lineTo(ptsArr[idx][subidx][total].x, ptsArr[idx][subidx][total].y);
    ctx.stroke();
    ctx.closePath();
    total++;
}

let wrapper = (pointsArr, idx = 0) => {
  animate(1, pointsArr, idx, wrapper);
};

let wrapperMult = (pointsDArr, idx = 0) => {
  for (var i = 0; i < pointsDArr[idx].length - 1; i++) {
    animate(1, pointsDArr, idx, i, console.log);
  }
  curr = pointsDArr[idx].length - 1;
  animate(1, pointsDArr, idx, curr, wrapperMult);
};

let pArray = [[points, points2], [points3, points4]];

wrapperMult(pArray);

// animatePr(t, points2, max, animatePr, points);

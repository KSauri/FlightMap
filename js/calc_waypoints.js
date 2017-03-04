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

export default calcWaypoints;

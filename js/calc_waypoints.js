const calcWaypoints = (verts) => {
    let waypoints = [];
    for (let i = 1; i < verts.length; i++) {
        let pt0 = verts[i - 1];
        let pt1 = verts[i];
        let dx = pt1.x - pt0.x;
        let dy = pt1.y - pt0.y;
        for (let j = 0; j < 40; j++) {
            let x = Math.floor(pt0.x + dx * j / 40);
            let y = Math.floor(pt0.y + dy * j / 40);
            waypoints.push({
                x: x,
                y: y
            });
        }
    }
    return (waypoints);
};

export default calcWaypoints;

import all_airports from './us_airports';




const drawAirports = (ctx) => {
  let hubs = ["148","17","136","78","105","48"];
  let canvas = document.getElementById("canvas");
  for (let airport in all_airports) {
    if (airport === "size") { continue; }
    ctx.beginPath();
    let x = all_airports[airport].pos.x;
    let y = all_airports[airport].pos.y;
    if (hubs.includes(airport)) {
      ctx.arc(x,y, 6, 0, Math.PI * 2, true);
      ctx.fillStyle = "#e5df34";
    } else {
      ctx.arc(x,y, 2.5, 0, Math.PI * 2, true);
      ctx.fillStyle = '#e5df34';
    }
    ctx.closePath();
    ctx.fill();
  }
};

export default drawAirports;

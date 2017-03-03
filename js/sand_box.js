import all_airports from './us_airports';


const parseLat = (lat) => {
  let rightMinusLeft = -71.7979 + 128.3877;
  let answer = Math.abs(710 * (lat + 128.3877)/rightMinusLeft);
  return answer;
};

const parseLng = (lng) => {
  let topMinusBottom = 51.179910 - 21.6940;
  let answer = Math.abs(640 * (51.179910 - lng)/topMinusBottom);
  return answer;
};


const drawAirports = () => {

  var canvas = document.getElementById('canvas');
  canvas.width = 900;
  canvas.height = 600;
  var ctx = canvas.getContext('2d');

  for (var airport in all_airports) {
    ctx.beginPath();
    let y = parseLng(all_airports[airport].pos.x);
    let x = parseLat(all_airports[airport].pos.y);
    debugger
    ctx.arc(x,y, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
};

export default drawAirports;

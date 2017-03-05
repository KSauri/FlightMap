import calcWaypoints from './calc_waypoints';
import astar from './a_star';
import all_airports from './us_airports';


let start = all_airports["14"];
let end = all_airports["83"];

let paths = [];
let pathGenerations = astar.search(all_airports, start, end);

for (var pathGen = 0; pathGen < pathGenerations.length - 1; pathGen++) {
  paths.push([]);
  for (var airport = 1; airport < pathGenerations[pathGen].length; airport++) {
    let wayPoints = calcWaypoints([pathGenerations[pathGen][0].pos,
      pathGenerations[pathGen][airport].pos]);
    paths[pathGen]
      .push(wayPoints);
  }
}

export default paths;










//

import calcWaypoints from './calc_waypoints';
import astar from './a_star';
import airports from './airports';



let paths = [];
let pathGenerations = astar.search(airports, airports.A, airports.D);

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

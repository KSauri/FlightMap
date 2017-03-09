import calcWaypoints from './calc_waypoints';
import astar from './a_star';
import all_airports from './us_airports';



const pathGenerator = (airports, start, end, method) => {
  let pathGenerations;
  if (method) {
    pathGenerations = method(airports, start);
  } else {
    pathGenerations = astar.search(airports, start, end)[0];
  }
  let paths = [];

  for (let pathGen = 0; pathGen < pathGenerations.length; pathGen++) {
    paths.push([]);
    for (let airport = 1; airport < pathGenerations[pathGen].length; airport++) {
      let wayPoints = calcWaypoints([pathGenerations[pathGen][0].pos,
        pathGenerations[pathGen][airport].pos]);
      if (pathGenerations[pathGen].final) {
        wayPoints.final = true;
      }
      paths[pathGen].push(wayPoints);
      }
    }
  return paths;
};


export default pathGenerator;










//

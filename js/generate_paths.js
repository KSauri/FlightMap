import calcWaypoints from './calc_waypoints';
import astar from './a_star';
import all_airports from './us_airports';



const pathGenerator = (airports, start, end) => {
  let pathGenerations = astar.search(airports, start, end);
  let paths = [];

  for (let pathGen = 0; pathGen < pathGenerations.length - 1; pathGen++) {
    paths.push([]);
    for (let airport = 1; airport < pathGenerations[pathGen].length; airport++) {
      let wayPoints = calcWaypoints([pathGenerations[pathGen][0].pos,
        pathGenerations[pathGen][airport].pos]);
        paths[pathGen]
        .push(wayPoints);
      }
    }
  return paths;
};


export default pathGenerator;










//

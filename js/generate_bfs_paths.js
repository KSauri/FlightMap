import calcWaypoints from './calc_waypoints';
import flightBreadthFirstSearch from './breadth_first_paths';
import all_airports from './us_airports';


const bfsPathGenerator = (airports, start, end) => {
  let pathGenerations = flightBreadthFirstSearch(airports, start);
  let paths = [];
  for (let pathGen = 0; pathGen < pathGenerations.length; pathGen++) {
    let currentPathGen = [];
    for (var airportGen = 0; airportGen < pathGenerations[pathGen].length; airportGen++) {
      for (let airport = 1; airport < pathGenerations[pathGen][airportGen].length; airport++) {
        let wayPoints = calcWaypoints([pathGenerations[pathGen][airportGen][0].pos,
          pathGenerations[pathGen][airportGen][airport].pos]);
          currentPathGen.push(wayPoints);
        }
      }
      paths.push(currentPathGen);
    }
  return paths;
};


export default bfsPathGenerator;

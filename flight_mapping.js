// import astar from './js/a_star';
// import airports from './js/airports';
import drawAirports from './js/sand_box';
import drawPathGenerations from './js/draw_paths';
import paths from './js/generate_paths';
import all_airports from './js/us_airports';

window.all_airports = all_airports;

drawAirports();
drawPathGenerations(paths);

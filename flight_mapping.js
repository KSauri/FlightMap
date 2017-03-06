import astar from './js/a_star';
// import airports from './js/airports';
import drawAirports from './js/draw_airports';
import drawPathGenerations from './js/draw_paths';
import paths from './js/generate_paths';
import all_airports from './js/us_airports';
import chooseSrcDest from './js/choose_src_dest';

window.airports = all_airports;

let canvas = document.getElementById('canvas');
canvas.width = 1000;
canvas.height = 700;
let ctx = canvas.getContext('2d');

drawAirports(ctx);

chooseSrcDest(canvas, ctx, all_airports);
// drawPathGenerations(paths);

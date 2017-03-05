import astar from './js/a_star';
// import airports from './js/airports';
import drawAirports from './js/sand_box';
import drawPathGenerations from './js/draw_paths';
import paths from './js/generate_paths';
import all_airports from './js/us_airports';
import choose_src_dest from './js/choose_src_dest';

window.all_airports = all_airports;

let canvas = document.getElementById('canvas');
canvas.width = 1000;
canvas.height = 700;
let ctx = canvas.getContext('2d');

drawAirports(ctx);

choose_src_dest(canvas, ctx)();
// drawPathGenerations(paths);

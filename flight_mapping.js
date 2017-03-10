import astar from './js/a_star';
import drawAirports from './js/draw_airports';
import drawPathGenerations from './js/draw_paths';
import pathGenerator from './js/generate_paths';
import all_airports from './js/us_airports';
import chooseSrcDest from './js/choose_src_dest';
import flightBreadthFirstSearch from './js/breadth_first_paths';
import bfsPathGenerator from './js/generate_bfs_paths';

window.all_airports = all_airports;
window.flightBreadthFirstSearch = flightBreadthFirstSearch;


document.addEventListener("DOMContentLoaded", function(){
    let canvas = document.getElementById('canvas');
    canvas.width = 1000;
    canvas.height = 580;
    let ctx = canvas.getContext('2d');

    ctx.drawImage(document.getElementById('source'), -16, -60);
    drawAirports(ctx);

    drawPathGenerations(bfsPathGenerator(all_airports, all_airports["1"], null));
    let toggleButton = (setter) => {
      if (setter === "disable") {
        document.getElementById("srcAndDest").innerHTML = "Simulating Flights";
        document.getElementById("srcAndDest").setAttribute("disabled", "true");
      } else if (setter === "enable") {
        document.getElementById("srcAndDest").innerHTML = "Clear and fly again!";
        document.getElementById("srcAndDest").removeAttribute("disabled");
      }
    };
    document.getElementById("srcAndDest").addEventListener("click", () => {
      chooseSrcDest(canvas, ctx, all_airports, toggleButton);
    });

});

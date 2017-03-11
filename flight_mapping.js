import astar from './js/a_star';
import drawAirports from './js/draw_airports';
import drawPathGenerations from './js/draw_paths';
import pathGenerator from './js/generate_paths';
import all_airports from './js/us_airports';
import chooseSrcDest from './js/choose_src_dest';
import exhaustiveDemo from './js/exhaustive_search_demo';
import bfsPathGenerator from './js/generate_bfs_paths';

window.eventListeners = {};

document.addEventListener("DOMContentLoaded", function(){
    let canvas = document.getElementById('canvas');
    canvas.width = 940;
    canvas.height = 580;
    let ctx = canvas.getContext('2d');

    ctx.drawImage(document.getElementById('source'), -16, -60);
    drawAirports(ctx);

    let toggleButtons = (setter) => {
      if (setter === "disable") {
        document.getElementById("srcAndDest").innerHTML = "Drawing Flight Paths";
        document.getElementById("srcAndDest").setAttribute("disabled", "true");
        document.getElementById("exhaustive").innerHTML = "Drawing Flight Paths";
        document.getElementById("exhaustive").setAttribute("disabled", "true");
      } else if (setter === "enable") {
        document.getElementById("srcAndDest").innerHTML = "Clear and fly again!";
        document.getElementById("srcAndDest").removeAttribute("disabled");
        document.getElementById("exhaustive").innerHTML = "Exhaustive Search Demo";
        document.getElementById("exhaustive").removeAttribute("disabled");
      }
    };
    document.getElementById("srcAndDest").addEventListener("click", () => {
      chooseSrcDest(canvas, ctx, all_airports, toggleButtons);
    });
    document.getElementById("exhaustive").addEventListener("click", () => {
      exhaustiveDemo(canvas, ctx, all_airports, toggleButtons);
    });
    document.getElementById("explanation").addEventListener("click", () => {
      document.getElementById("modal").className = "modal";
      document.getElementById("modal-text-container").className = "modal-text-container";
    });
    document.getElementById("modal").addEventListener("click", (e) => {
      if (e.target.id === "modal") {
        document.getElementById("modal").className = "modal-hidden";
        document.getElementById("modal-text-container").className = "modal-hidden";
      }
    });

});

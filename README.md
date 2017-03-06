# FlightMapper

FlightMapper is a visualization of the A* path-finding algorithm.
The visualization uses air flight as a medium to convey the speed and
efficiency of the A* algorithm.  

## Instructions

The visualization has three modes.  The first displays an example of
an 'exhaustive approach' - dual breadth first search, with all airports
being touched.  The second example displays the A* algorithm, which uses
heuristics to decide which paths it wants to travel down.  Lastly,
users are able to choose a source and destination airport in order
to continue to explore the algorithm.

##Technologies Used

#### [Pandas](http://pandas.pydata.org/)

In order to represent the largest 300 airports in the US, data was
extracted from [openflights](http://openflights.org/data.html) and
modified using the Pandas library.  

// Code from Pandas needs to be cleaned up, will be placed here //

#### [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

The canvas API was used to render airports and flight paths.  Each path
is generated in fractions of size 1/100.  Drawing each path is then a
matter of having a recursive callback, where canvas draws each line
segment thusly:

```javascript
const drawLineSegment = (pos, idx) => {
  ctx.beginPath();
  ctx.moveTo(pos[idx - 1].x, pos[idx - 1].y);
  ctx.lineTo(pos[idx].x, pos[idx].y);
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.closePath();
};
```

##Technical Implementation

###Path Generations

Paths are drawn in 'generations', in order to show which airports
the algorithm considers at each iteration of the algorithm.  

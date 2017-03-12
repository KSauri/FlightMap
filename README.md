# FlightMapper

FlightMapper is a visualization of the A* path-finding algorithm.
The visualization uses air flight as a medium to convey the speed and
efficiency of the A* algorithm.  

## Instructions

The visualization opens with a modal explaining how the A* path finding
algorithm works.  When closed, users have three choices for how they want
to interact with the visualization - the background information modal,
choosing their own path, and seeing an exhaustive search demonstration.
The primary pedagogical tool is the "choose source and destination" button,
which will run A* on the source and destination airports and demonstrate
the choices the algorithm makes at each turn.  

##Technologies Used

#### [Pandas](http://pandas.pydata.org/)

In order to represent the largest 300 airports in the US, data was
extracted from [openflights](http://openflights.org/data.html) and
modified using the Pandas library.  


#### [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

The canvas API was used to render airports and flight paths.  Each path
is generated in fractions of size 1/40.  Drawing each path is then a
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

The A* algorithm works by choosing the best currently available node,
drawing in newly connected nodes, and repeating this process until
the end node is found.  To illustrate this, cascading callbacks were
necessary.  

Each path function draws a fraction of the total path and recursively
calls itself until the path is finished.  Many paths
make up a "path generation", where one airport is chosen and paths to
all unchecked neighboring airports are drawn.  One "lineage", therefore,
consists of all generations of paths from source to ending node.

Accordingly, one lineage may consist of hundreds of cascading callbacks.

To achieve this, a wrapper function starts the process and passes
itself into the last path drawn in a generation (the last being arbitrarily
chosen).  In this way, as many generations of paths can be chained
and drawn:

```javascript
const drawPathGenerations = (pathGens, toggleDrawing, generation = 0) => {
  if (pathGens.length === generation) {
    toggleDrawing("enable");
    return;}
  while (pathGens[generation].length === 0 || generation === pathGens.length) {
    if (generation === pathGens.length - 1) {
      toggleDrawing("enable");
      return; }
    generation ++; //Don't skip generations with a length of 0
  }
  for (let path = 0; path < pathGens[generation].length - 1; path++) {
    animate(1, pathGens, generation, path, toggleDrawing);
  }   // only one path calls drawPathGenerations to draw the next generation
  let lastPath = pathGens[generation].length - 1;
  animate(1, pathGens, generation, lastPath, toggleButton, drawPathGenerations);
};
```

Users may only interact with path-drawing buttons when cascading callbacks
are not drawing on the canvas.  Therefore the button to 'toggleDrawing'
must be disabled and only enabled at the completion of drawing.


#### A Star Algorithm

The A star algorithm uses two properties to determine the shortest path
quickly.  The first is the distance traveled from the origin to any new node.
The other is the distance from any new node to the destination.  To calculate
both of these values, FlightMapper uses the pythagorean formula:

```javascript
pythagoreanDis: (pos0, pos1) => {
  var d1 = Math.abs(pos1.x - pos0.x);
  var d2 = Math.abs(pos1.y - pos0.y);
  return Math.sqrt(Math.pow(d1,2) + Math.pow(d2,2));
}
```

Additionally, this A star implementation utilizes a priority queue to
allow for faster fetching of the current "best" new node.

#### Data Parsing

Data was pulled from [openflights](http://openflights.org/data.html) and
used in this project.  The 300 largest airports were chosen from a set
including most airports in the world.  Parsing occurred in two stages.  

First, raw data was pulled and formatted using Python's Pandas data analytics
library:

```python
url = 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat'
airport_raw_data = urllib.urlopen(url)
airport_table = pd.read_table(airport_raw_data)
raw_airport_dataframe = pd.DataFrame(airport_table)
airport_separated_df = raw_airport_dataframe['all_data'].str.split(',', expand=True)
...
largest_airports = us_airports[us_airports['threeLetterName'].isin(largest_airport_codes)]

largest_airports = largest_airports.reset_index(drop=True)

largest_airports = largest_airports.to_json
```

From there, more parsing was necessary in JavaScript in order to have
a structure resembling this:

```javascript
const airports = {
  A: {
    id: 1,
    neighbors: {
      B: 3, // The value for each neighbor is its distance
      F: 5,
      E: 9
    },
    pos: {
      x: 50,
      y: 200}
  },
  B: {
    id: 2,
    ...
  }
}

```


#### Aesthetics

The aesthetic of the game is meant to mimic an airplane's cockpit control
panel.  Text is meant to display indicators for a pilot.  

### To-Do

- [ ] Add the ability to create new airports and fly to them
- [ ] Improve the aesthetics of the chosen map, or replace the current map
- [ ] Add on hover effects to airports

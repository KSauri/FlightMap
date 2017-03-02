const airports = {
  A: {
    id: 1,
    neighbors: {
      B: 3,
      F: 5,
      E: 9
    },
    pos: {
      x: 50,
      y: 200}
  },
  B: {
    id: 2,
    neighbors: {
      C: 6,
      A: 3,
      E: 9
    },
    pos: {
      x: 100,
      y: 100}
  },
  C: {
    id: 3,
    neighbors: {
      B: 6,
      D: 8
    },
    pos: {
      x: 250,
      y: 50}
    },
  D: {
    id: 4,
    neighbors: {
      E: 1,
      C: 8
    },
    pos: {
      x: 300,
      y: 180}
  },
  E: {
    id: 5,
    neighbors: {
      A: 9,
      F: 9,
      D: 1,
      B: 9
    },
    pos: {
      x: 280,
      y: 240}
  },
  F: {
    id: 6,
    neighbors: {
      E: 9,
      A: 5
    },
    pos: {
      x: 120,
      y: 330}
  }
};

export default airports;

export const parseLng = (lng) => {
  let rightLngMinusLeft = -71.7979 + 128.3877;
  let answer = Math.abs(800 * (lng + 128.3877)/rightLngMinusLeft);
  return answer;
};

export const parseLat = (lat) => {
  let topLatMinusBottom = 51.179910 - 21.6940;
  let answer = Math.abs(600 * (51.179910 - lat)/topLatMinusBottom);
  return answer;
};

export const addIds = (airports, result) => {
  Object.keys(airports.city).forEach((airportId) => {
    result[airportId] = {};
    result[airportId].id = airportId;
  });
};

export const addCode = (airports, result) => {
  Object.keys(airports.threeLetterName).forEach((airportId) => {
    result[airportId].code = airports.threeLetterName[airportId];
  });
};

export const addLng = (airports, result) => {
  Object.keys(result).forEach((airportId) => {
    result[airportId].pos = {};
    let lng = parseFloat(airports.lng[airportId]);
    let canvasLng = parseLng(lng);
    result[airportId].pos.x = canvasLng; });
};

export const addLat = (airports, result) => {
  Object.keys(result).forEach((airportId) => {
    let lat = parseFloat(airports.lat[airportId]);
    let canvasLat = parseLat(lat);
    result[airportId].pos.y = canvasLat; });
};

export const addNeighbors = (result) => {
  Object.keys(result).forEach((airportId) => {
    result[airportId].neighbors = {}; });
};



export const parseAirports = (airports, result) => {
  addIds(airports, result);
  addCode(airports, result);
  addLng(airports, result);
  addLat(airports, result);
  addNeighbors(result);
};


export const pythagoreanDis = (pos0, pos1) => {
  var d1 = Math.abs (pos1.x - pos0.x);
  var d2 = Math.abs (pos1.y - pos0.y);
  return Math.sqrt(Math.pow(d1,2) + Math.pow(d2,2));
};

export const shuffle = (array) => {
    for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
};



export const makeNeighbors = (airportOne, airportTwo) => {
  let dist = pythagoreanDis(airportOne.pos, airportTwo.pos);
  airportOne.neighbors[airportTwo.id] = dist;
  airportTwo.neighbors[airportOne.id] = dist;
};



export const size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};



export const assignNeighbors = (airports) => {
  Object.keys(airports).forEach((airportOneId) => {
    if (size(airports[airportOneId].neighbors) < 2) {
      Object.keys(airports).forEach((airportTwoId) => {
        let dist = pythagoreanDis(airports[airportOneId].pos, airports[airportTwoId].pos);
        if (airportTwoId !== airportOneId && dist < 32) {
          makeNeighbors(airports[airportOneId], airports[airportTwoId]);
        }
      });
    }
  });
};

export const assignIsolatedNeighbors = (airports) => {
  Object.keys(airports).forEach((airportOneId) => {
    if (size(airports[airportOneId].neighbors) < 1) {
      Object.keys(airports).forEach((airportTwoId) => {
        let dist = pythagoreanDis(airports[airportOneId].pos, airports[airportTwoId].pos);
        if (airportTwoId !== airportOneId && dist < 80) {
          makeNeighbors(airports[airportOneId], airports[airportTwoId]);
        }
      });
    }
  });
};

export const connectNorthDakota = (airports) => {
  makeNeighbors(airports["148"], airports["215"]);
};

export const assignHubs = (airports) => {
  let hubIds = ["148", "17", "136", "90", "83", "48"]; // airport id's of JFK, ORD, LAX, ATL, DFW and SEA
  for (var hubOne = 0; hubOne < hubIds.length; hubOne++) {
    for (var hubTwo = hubOne + 1; hubTwo < hubIds.length; hubTwo++) {
      makeNeighbors(airports[hubIds[hubOne]], airports[hubIds[hubTwo]]);
    }
    Object.keys(airports).forEach((nonHubAirportId) => {
      let dist = pythagoreanDis(airports[hubIds[hubOne]].pos, airports[nonHubAirportId].pos);
      if (hubIds[hubOne] !== nonHubAirportId &&
        dist < 160 &&
        hubOne !== 0) {
        makeNeighbors(airports[hubIds[hubOne]], airports[nonHubAirportId]);
      } else if (hubOne === 0 &&
        hubIds[hubOne] !== nonHubAirportId &&
        dist < 200) {

          makeNeighbors(airports[hubIds[hubOne]], airports[nonHubAirportId]);
        }
    });
  }
};

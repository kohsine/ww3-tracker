// const fs = require('fs')
// const path = require('path')
// const ukrainePoly = require(path.resolve(__dirname, "./script.js"))
const ukrainePoly = require('./ukraine-poly');

const avg = [0, 0];
const newPoly = [];

const div = 20;

for (let i = 1; i < ukrainePoly.length; i++) {
  avg[0] += ukrainePoly[i].lat;
  avg[1] += ukrainePoly[i].lng;
  if (i % div === 0) {
    newPoly.push({ lat: avg[0] / div, lng: avg[1] / div });
    avg[0] = 0;
    avg[1] = 0;
  }
}

newPoly.push({ lat: avg[0] / (ukrainePoly.length % div - 1), lng: avg[1] / (ukrainePoly.length % div - 1) });

// fs.writeFile('./ukraine-poly-reduced.js', "export const ukrainePoly = " + JSON.stringify(newPoly, null, 2), console.log);

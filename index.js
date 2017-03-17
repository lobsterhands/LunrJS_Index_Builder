// index.js
// This is the starting point for the app (see package.json "scripts": {
//  "start": "node index.js"
//  }

const fs = require('fs');
const createIndex = require('./app/createIndex');

let indexFileName = './json_write/lyricsIndex.json';

let indexExists = false;
let data; // the data contained by the json file
try {
  data = fs.readFileSync(indexFileName, 'utf-8');
  indexExists = true;
} catch (ex) {
  console.log(ex);
}

if (indexExists) {
  console.log('The index already exists.');
} else {
  console.log('Creating new index...');
  createIndex.createLunrIndex();
}

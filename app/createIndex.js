const fs = require('fs');
const lunr = require('lunr');

function createLunrIndex() {
  let inputFileName = './json_read/lyrics.json';
  let outputFileName = './json_write/lyricsIndex.json';
  let data; // the data contained by the json file


  try {
    data = fs.readFileSync(inputFileName, 'utf-8');
  } catch (ex) {
    console.log(ex);
  }

  data = JSON.parse(data); // ensure data is in proper format

  var lyricsIndex; // the lunr index
  var store = {}; // the lunr store (maps the ref to the proper doc index)

  //Create the index with desired fields
  lyricsIndex = lunr(function () {
      this.field('Song');
      this.field('Artist');
      this.field('Rank', { boost: 10 });
      this.field('Year');
      this.ref('Lyrics'); // Use lyrics as the ref because they are unique
  });

  for (var i = 1; i < data.length; i++) {
    var doc = {
      'Rank': data[i].FIELD1,
      'Song': data[i].FIELD2,
      'Artist': data[i].FIELD3,
      'Year': data[i].FIELD4,
      'Lyrics': data[i].FIELD5
    };

    store[doc.Lyrics] = {
      'Rank': doc.Rank,
      'Song': doc.Song,
      'Artist': doc.Artist,
      'Year': doc.Year
    };

    lyricsIndex.add(doc, true);
  }

  var indexString = JSON.stringify({
    index: lyricsIndex,
    store: store
  });

  fs.writeFile(outputFileName, indexString);
}

module.exports.createLunrIndex = createLunrIndex;

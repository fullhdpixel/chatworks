/**
 * Populate initial dataset to analyze
 * this is basically a stub ATM
 */
var populateData = function() {
  var dump = Messages.findOne({}, {skip: Math.floor(Math.random()*25000)});
  return dump;
}

/**
 * Add a list of stopwords to mongo
 * @type {*}
 */
var stopwordsFromFile = function(filename) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if(err) throw err;
    console.log("Processing data.");
    data = data.split("\n");
    for(var i = 0; i < data.length; i++) {
      StopWords.insert({
        word: data
      });
    }
  });
};
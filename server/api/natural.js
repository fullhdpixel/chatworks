/**
 * Define a word using wordnet, this is mostly for debugging
 * @param msg
 * @returns {string}
 */
Meteor.methods({
  dictionary: function(to, query) {
    var future = new Future();
    var definition = '';
    wordnet.lookup(query, function(results) {
      results.forEach(function(result) {
        definition = result.gloss;
      });
      future.return(definition);
    });
    return future.wait();
  },

/**
 * Convert word into a random synonym
 * @param msg
 * @returns {string}
 */
  snynonym: function (word) {
    var future = new Future();
    var newWord = '';
    wordnet.lookup(word, function(results) {
      if(typeof results[0] != 'undefined') {
        newWord = results[0].synonyms[Math.floor(Math.random() * results[0].synonyms.length)] + '';
      } else {
        newWord = word + '';
      }
      future.return(newWord);
    });
    return future.wait();
  },

/**
 * Convert sentiment into a more eloquent message
 * @param msg
 * @returns {string}
 */
  eloquent: function (msg) {
    var tokenizer = new natural.WordTokenizer();
    var tokes = tokenizer.tokenize(msg);
    var futures = _.map(tokes, function(toke) {
      var future = new Future();
      var onComplete = future.resolver();
      Meteor.call('snynonym', toke, function(error, result) {
        onComplete(error, result);
      });
      return future;
    });
    Future.wait(futures);
    return _.invoke(futures, 'get');
  },

/**
 * Get the Part-Of-Speech Tag of a word
 * @param word
 * @returns {string}
 */
  pos: function(word) {
    var future = new Future();
    wordnet.lookup(word, function(results) {
      var tag = word;
      if(results[0] != undefined) {
        if(results[0].pos === 'n') {
          tag = 'noun';
        } else if (results[0].pos === 'v') {
          tag = 'verb';
        } else if (results[0].pos === 'a') {
          tag = 'adjective';
        } else if (results[0].pos === 'r') {
          tag = 'adverb';
        } else if (results[0].pos === 's') {
          tag = 'satelite';
        }
      }
      future.return(tag);
    });
    return future.wait();
  },

/**
 * Get the x pos tags of a sentence (eg. nouns)
 * @param sentence
 * @returns {array}
 */
  getPos: function(sentence) {
    var tokenizer = new natural.WordTokenizer();
    var tokes = tokenizer.tokenize(sentence);
    var futures = _.map(tokes, function(toke) {
      var future = new Future();
      var onComplete = future.resolver();
//      var toke = natural.LancasterStemmer.stem(toke);
      Meteor.call('pos', toke, function(error, result) {
        onComplete(error, result);
      });
      return future;
    });
    Future.wait(futures);
    return _.invoke(futures, 'get');
  },

/**
 * Get the POS Tags of a message
 * @param msg
 * @returns {string}
 */
  chunk: function (msg) {
    var tokenizer = new natural.WordTokenizer();
    var tokes = tokenizer.tokenize(msg);
    var futures = _.map(tokes, function(toke) {
      var future = new Future();
      var onComplete = future.resolver();
      Meteor.call('pos', toke, function(error, result) {
        onComplete(error, result);
      });
      return future;
    });
    Future.wait(futures);
    return _.invoke(futures, 'get');
  }
});
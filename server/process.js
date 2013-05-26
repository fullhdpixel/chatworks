var Future = Npm.require("fibers/future");

/**
 * Cleans the message up
 * @param msg
 * @returns {string}
 */
processMessage = function (msg) {
  var message = msg.toLowerCase();

  //url
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  message = message.replace(exp, 'URL');

  //@user
  exp = /(\b@[^\s]+)/ig;
  message = message.replace(exp, 'AT_USER');

  //remove extra whitespace
  exp = /\s{2,}/g;
  message = message.replace(exp, ' ');

  //replace #hash with hash
  exp = /#(\S*)/g;
  message = message.replace(exp, '$1');

  //replace repeating characters; examppple/example

  //remove punctuation

  //remove words that start with a number

  return message;
};

/**
 * Utility to get nth word in a string
 * @param string
 * @param n
 * @returns {string}
 */
getNthWord = function(string, n) {
  var words = string.split(" ");
  return words[n-1];
}

/**
 * Check for a URL in the current message, return the url
 * @param arr
 * @returns {boolean}
 */
checkURL = function (msg) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  if (msg.match(exp)) {
    return true;
  }
  return false;
}

/**
 * Derive some message sentiment, a wrapper for natural
 * this is a stub
 * @param msg
 * @returns {string}
 */
getSentiment = function (msg) {
  return msg;
};

/**
 * Define a word using wordnet
 */
Meteor.methods({
  asyncJob: function(msg) {
    var future = new Future();
    var definition = 'Please only define one word, bro';
    wordnet.lookup(msg, function(results) {
      results.forEach(function(result) {
        definition = result.gloss;
      });
      future.ret(definition);
    });
    return future.wait();
  }
});

/**
 * Convert sentiment into a more eloquent message
 * this is a stub
 * @param sentiment
 * @returns {string}
 */
Meteor.methods({
  eloquent: function (msg) {
    var tokenizer = new natural.WordTokenizer();
    var tokes = tokenizer.tokenize(msg);
    var futures = _.map(tokes, function(toke) {
      var future = new Future();
      var onComplete = future.resolver();
      Meteor.call('lookup', toke, function(error, result) {
        onComplete(error, result);
      });
      return future;
    });
    Future.wait(futures);
    return _.invoke(futures, 'get');
  }
});

Meteor.methods({
  lookup: function (word) {
    var future = new Future();
    var newWord = '';
    wordnet.lookup(word, function(results) {
      if(typeof results[0] != 'undefined') {
        newWord = results[0].synonyms[Math.floor(Math.random() * results[0].synonyms.length)] + '';
      } else {
        newWord = word + '';
      }
      future.ret(newWord);
    });
    return future.wait();
  }
});

/**
 * Formulate a response for sentiment input
 * this is a stub
 * @param sentiment
 * @returns {string}
 */
formulateResponse = function (sentiment) {
  var response = sentiment;
  return response;
};

/**
 * AI responses to various triggers
 * @param processedMessage
 * @returns {string}
 */
getResponse = function (processedMessage) {
  var str = '';
  if (processedMessage === '&talk') {
    if (config.talk) {
      config.talk = false;
      return 'Muted';
    } else {
      config.talk = true;
      return "Unmuted";
    }
  }
  if (config.talk) {
    //speaks at random intervals
    var squeek = Math.random();
    //simple if chain for rudimentary chat functions
    if (processedMessage === 'pent' || processedMessage === 'Pent') {
      str = "Pent is an hero";
    } else if (processedMessage.substring(0,2) === '.h') {
      str = "functions include: .l, .a, .i, .d, .e, .np, .y";
    } else if (processedMessage.substring(0,2) === '.d') {
      Meteor.call('asyncJob', processedMessage.slice(3), function(error, result) {
        str = result;
      });
    } else if (processedMessage.substring(0,2) === '.e') {
      Meteor.call('eloquent', processedMessage.slice(3), function(error, result) {
        str = result.join(' ');
      });
    } else if (processedMessage.substring(0,2) === '.a') {
      return getSentiment(processedMessage.slice(3));
    } else if (processedMessage === '<_<') {
      str = '>_>';
    } else if (processedMessage === '>_>') {
      str = '<_<';
    } else if (processedMessage.indexOf('chatworks') !== -1 || squeek < 0.01) {
      var msg = Messages.findOne({irc: true}, {skip: Math.floor(Math.random() * BOUNTY_COUNT)});
      if(msg) {
          Meteor.call('eloquent', msg.message, function(error, result) {
            str = result.join(' ');
          });
      }
    } else if (processedMessage.substring(0,2) === '.y') {
      var query = processedMessage.slice(3);
      if(query) {
        var response = Meteor.http.call('GET', 'https://www.googleapis.com/youtube/v3/search?part=id&q='+query+'&key='+config.youtubeApiKey);
        if (response.statusCode === 200) {
          var data = response.data;
          if(data.items[0]) {
            return " http://youtube.com/watch?v="+ data.items[0].id.videoId;
          }
        }
      }
      return "404 :(";
    } else if (processedMessage.substring(0,2) === '.i') {
      var query = processedMessage.slice(3);
      if(query) {
        var response = Meteor.http.call('GET', 'https://api.imgur.com/3/gallery/search?q='+query,
          {headers: {'Authorization': 'Client-ID ' + config.imgurClientId}});
        if (response.statusCode === 200) {
          var data = response.data;
          if(data.data[0])
            return " "+ data.data[0].link;
        }
      }
      return "404: funny not found";
    } else if (processedMessage.substring(0,2) === '.l') {
      var query = processedMessage.slice(3);
      query = query.split(" ");
      if(query) {
        var response = Meteor.http.get('http://ws.audioscrobbler.com/2.0/?method=tasteometer.compare&type1=user&type2=user&value1='+query[0]+'&value2='+query[1]+'&api_key='+config.lastfmClientId+'&format=json');
        if (response.statusCode === 200) {
          var data = response.data;
          if(data.comparison) {
            return " compatibility: "+ (Number(data.comparison.result.score) / 100 * 10000).toFixed(2) +"%";
          }
        }
      }
      return "...";
    } else if (processedMessage.substring(0,3) === '.np') {
      var query = processedMessage.slice(4);
      query = query.split(" ");
      if(query) {
        var response = Meteor.http.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+query[0]+'&api_key='+config.lastfmClientId+'&format=json');
        if (response.statusCode === 200) {
          var data = response.data;
          if(data.recenttracks) {
            var essence = data.recenttracks.track[0].artist['#text'] +" - "+ data.recenttracks.track[0].name;
            var youtube = Meteor.http.call('GET', 'https://www.googleapis.com/youtube/v3/search?part=id&q='+essence+'&key='+config.youtubeApiKey);
            if (response.statusCode === 200) {
              var video = youtube.data;
              if(video.items[0]) {
                return essence + " http://youtube.com/watch?v="+ video.items[0].id.videoId;
              }
            }
          }
        }
      }
      return "...";
    }
  }
  return str;
};
var Future = Npm.require("fibers/future");

/**
 * Cleans the message up
 * @param msg
 * @returns {string}
 */
parseMessage = function (msg) {
  var message = msg.toLowerCase();

  //url
//  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
//  message = message.replace(exp, 'URL');

  //@user
//  exp = /(\b@[^\s]+)/ig;
//  message = message.replace(exp, 'AT_USER');

  //remove extra whitespace
//  exp = /\s{2,}/g;
//  message = message.replace(exp, ' ');

  //replace #hash with hash
//  exp = /#(\S*)/g;
//  message = message.replace(exp, '$1');

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
 * Check for a URL in the current message
 * @param msg
 * @returns {boolean}
 */
checkURL = function(msg) {
  var exp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
  if (msg.match(exp)) {
    return true;
  }
  return false;
}

/**
 * Get URLs in the current message
 * @param msg
 * @returns {array}
 */
getURL = function (msg) {
  var exp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
  return msg.match(exp);
}

/**
 * Derive some message sentiment, a wrapper for natural
 * this is a stub
 * @param msg
 * @returns {string}
 */
getSentiment = function(msg) {
  return msg;
};

/**
 * Define a word using wordnet, this is mostly for debugging
 * @param msg
 * @returns {string}
 */
Meteor.methods({
  define: function(msg) {
    var future = new Future();
    var definition = 'Please only define one word, bro';
    wordnet.lookup(msg, function(results) {
      results.forEach(function(result) {
        console.log('------------------------------------');
        console.log(result.synsetOffset);
        console.log(result.pos);
        console.log(result.lemma);
        console.log(result.synonyms);
        console.log(result.gloss);
        definition = result.gloss;
      });
      future.ret(definition);
    });
    return future.wait();
  }
});

/**
 * Convert word into a random synonym
 * @param msg
 * @returns {string}
 */
Meteor.methods({
  snynonym: function (word) {
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
 * Convert sentiment into a more eloquent message
 * @param msg
 * @returns {string}
 */
Meteor.methods({
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
  }
});

/**
 * Get the POS Tag of a word
 * @param word
 * @returns {string}
 */
Meteor.methods({
  pos: function(word) {
    var future = new Future();
    var tag = 'narp';
    wordnet.lookup(word, function(results) {
      if(typeof results[0] != 'undefined') {
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
      future.ret(tag);
    });
    return future.wait();
  }
});

/**
 * Get the POS Tags of a message
 * @param msg
 * @returns {string}
 */
Meteor.methods({
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

/**
 * image tagger
 * @param html5 canvas of image
 * @returns {[string]}
 */
tagImage = function(canvas) { //todo using opencv
  var tags = [];
  return tags;
};

/**
 * AI responses to various triggers
 * @param message
 * @returns {string}
 */
processMessage = function (msg) {
  var parsedMessage = parseMessage(msg);
  var str = '';
  if (parsedMessage === '&talk') {
    if (config.talk) {
      config.talk = false;
      return 'Muted';
    } else {
      config.talk = true;
      return "Unmuted";
    }
  }
  if (config.talk) {
    //simple if chain for rudimentary chat functions
    if (parsedMessage === 'pent' || parsedMessage === 'Pent') {
      str = "Pent is an hero";
    } else if (checkURL(parsedMessage)) {
      var url = getURL(parsedMessage);
      Meteor.http.call("GET", url[0], {timeout:30000}, function(error, result) {
        if(result.statusCode === 200) {
          var cheerio = Cheerio.load(result.content);
          Bot.say("URL Title: "+cheerio('title').text());
        }
      });
    } else if (parsedMessage.substring(0,2) === '.h') {
      str = "functions include: .l x y (last.fm nickname compatability), .i x (imgur search), .d x (define), .np x (last.fm now playing), .y x (youtube search), .4 x (latest 4chan post from x board), .g x (google search) -- for .y and .g, exclude x if you want to search previous line";
    } else if (parsedMessage.substring(0,2) === '.d') {
      Meteor.call('define', parsedMessage.slice(3), function(error, result) {
        str = result;
      });
    } else if (parsedMessage.substring(0,2) === '.e') {
      Meteor.call('eloquent', parsedMessage.slice(3), function(error, result) {
        str = result.join(' ');
      });
    } else if (parsedMessage.substring(0,2) === '.t') {
      Meteor.call('chunk', parsedMessage.slice(3), function(error, result) {
        str = result.join(' ');
      });
    } else if (parsedMessage.substring(0,2) === '.l') {
      Meteor.call('lastfm', parsedMessage.slice(3), function(error, result) {
        Bot.say(result);
      });
    } else if (parsedMessage.substring(0,2) === '.a') {
      return getSentiment(parsedMessage.slice(3));
    } else if (parsedMessage === '<_<') {
      str = '>_>';
    } else if (parsedMessage === '>_>') {
      str = '<_<';
    } else if (parsedMessage.indexOf('chatworks') !== -1) {
      var msg = Messages.findOne({irc: true}, {skip: Math.floor(Math.random() * BOUNTY_COUNT)});
      if(msg) {
        if (checkURL(parsedMessage)) {
          Meteor.call('eloquent', msg.message, function(error, result) {
            str = result.join(' ');
          });
        } else {
          str = getURL(parsedMessage);
        }
      }
    } else if (parsedMessage.substring(0,2) === '.4') {
      var query = parsedMessage.slice(3);
      if(query) {
        var response = Meteor.http.call('GET', 'http://api.4chan.org/'+query+'/catalog.json');
        if (response.statusCode === 200) {
          var data = response.data;
          if(data[0]) {
            return "http://images.4chan.org/"+query+"/src/"+data[0].threads[0].tim+data[0].threads[0].ext+" ("+data[0].threads[0].now+") http://boards.4chan.org/"+query+"/res/"+data[0].threads[0].no;
          }
        }
      }
      return "404 :(";
    } else if (parsedMessage.substring(0,2) === '.g') {
      var query = parsedMessage.slice(3);
      if(query) {
        var response = Meteor.http.call('GET', 'https://www.googleapis.com/customsearch/v1?key='+config.googleApiKey+'&cx=013036536707430787589:_pqjad5hr1a&q='+query+'&alt=json');
        if (response.statusCode === 200) {
          var data = response.data;
          //todo: find date inside items, for instance "e3 date" was query
          if(data.items[0]) {
            return data.items[0].link+" ("+data.items[0].title+")";
          }
        }
      }
      return "404 :(";
    } else if (parsedMessage.substring(0,2) === '.y') {
      var query = parsedMessage.slice(3);
      if(query) {
        var response = Meteor.http.call('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+query+'&maxResults=1&safeSearch=none&type=video&key='+config.googleApiKey);
        if (response.statusCode === 200) {
          var data = response.data;
          if(data.items[0]) {
            return " http://youtube.com/watch?v="+ data.items[0].id.videoId+" ("+data.items[0].snippet.title+")";
          }
        }
      }
      return "404 :(";
    } else if (parsedMessage.substring(0,2) === '.i') {
      var query = parsedMessage.slice(3);
      if(query) {
        var response = Meteor.http.call('GET', 'https://api.imgur.com/3/gallery/search?q='+query,
          {headers: {'Authorization': 'Client-ID ' + config.imgurClientId}});
        if (response.statusCode === 200) {
          var data = response.data;
          if(data.data[0])
            return " "+ data.data[0].link +" ("+data.data[0].title+")";
        }
      }
      return "404: funny not found";
    } else if (parsedMessage.substring(0,3) === '.np') {
      var query = parsedMessage.slice(4);
      query = query.split(" ");
      if(query[0]) {
        var response = Meteor.http.call('GET', 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+query[0]+'&api_key='+config.lastfmClientId+'&format=json');
        if (response.statusCode === 200) {
          var data = response.data;
          if(typeof data.recenttracks != 'undefined') {
            var essence = data.recenttracks.track[0].artist['#text'] +" - "+ data.recenttracks.track[0].name;
            var youtube = Meteor.http.call('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+essence+'&maxResults=1&safeSearch=none&type=video&key='+config.googleApiKey);
            if (response.statusCode === 200) {
              var video = youtube.data;
              if(typeof video.items[0] != 'undefined') {
                return essence + " http://youtube.com/watch?v="+video.items[0].id.videoId+" ("+video.items[0].snippet.title+")";
              }
            }
            return essence;
          }
        }
      }
      return "...";
    }
  }
};
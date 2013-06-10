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
//  var exp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
  var exp = /(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
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
//  var exp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
  var exp = /(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
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
    var definition = '';
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
 * Get the Part-Of-Speech Tag of a word
 * @param word
 * @returns {string}
 */
Meteor.methods({
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
      future.ret(tag);
    });
    return future.wait();
  }
});

/**
 * Get the x pos tags of a sentence (eg. nouns)
 * @param sentence
 * @returns {array}
 */
Meteor.methods({
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
processMessage = function (handle, msg) {
  var parsedMessage = parseMessage(msg);
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
    if (checkURL(parsedMessage)) {
      var url = getURL(parsedMessage);
      //check if url has http, append if not
      if (!/^(f|ht)tps?:\/\//i.test(url[0])) {
         url[0] = "http://" + url[0];
      }
      Fiber(function() {
        Urls.insert({
          url: url[0],
          date_time: new Date()
        });
      });

      Meteor.http.call("GET", url[0], {
        timeout: 30000,
        followRedirects: true,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36'
        }
      }, function(error, response) {
        //todo: process youtube/forum archives, has dynamic js title tags?
        if(response.content !== null) {
          var cheerio = Cheerio.load(response.content); //todo: occasional exception from null content
          cheerio.html();
          //enhanced with tags
          Meteor.call('tagger', url[0], function(err, res) {
            if(err || res === '') {
              Bot.say("" + cheerio('title').text());
            } else {
              Bot.say("" + cheerio('title').text() + " (" + res + ")");
            }
          });
        }
      });
    } else if (parsedMessage.indexOf('&random') !== -1) {
      var msg = Messages.findOne({irc: true, bot: false}, {skip: Math.floor(Math.random() * BOUNDRY_COUNT)});
      if(msg) {
        Bot.say(msg);
      }
    } else if (parsedMessage.indexOf(config.botName) !== -1) {
//      var msg = Messages.findOne({irc: true, bot: false}, {skip: Math.floor(Math.random() * BOUNDRY_COUNT)});
      Meteor.call('choppa', handle, parsedMessage, function(error, result) {
        Bot.say(result);
      });
    } else if (parsedMessage.substring(0,5) === 'todo:' && handle.indexOf('pent')) {
      var query = parsedMessage.slice(6);
      Meteor.call('trello', query, function(error, result) {
        Bot.say(result);
      });
    }

    var creator = [
      'Pent is an hero'
      ,'Pent so powerfur'
      ,'Pent\'s beard so majestic'
    ];
    var poot = [
      '<_<'
      ,'>_>'
    ];
    var command = parsedMessage;
    switch(command) {
      case 'pent':
        Bot.say(creator.random());
        break;
      case '<_<':
        Bot.say(poot.random());
        break;
      case '>_>':
        Bot.say(poot.random());
        break;
      default:
        break;
    }

    //commands
    var command = parsedMessage.substring(0,2);
    var query = parsedMessage.slice(3);
    //todo: store commands in a collection
    switch(command) {
      case '.h':
        Bot.say("functions include: " +
          ".l x y (last.fm nickname compatability)" +
          ", .n x (last.fm now/last played)" +
          ", .4 x (latest 4chan post from x board)" +
          ", .i x (imgur search)" +
          ", .d x (define)" +
          ", .r subreddit (reddit)" +
          ", .m x (imdb search)" +
          ", .b (bitcoin price)" +
          ", .p x (pinboard search)" +
          ", .w x (wikipedia search)" +
          ", .s x (stackoverflow search)" +
          ", .y x (youtube search)" +
          ", .g x (google search) " +
          "-- for .i, .y and .g" +
          ", exclude x if you want to search previous line");
        break;
      case '.x':
        Bot.say(title1.random() + " " + title2.random() + " " + title3.random());
        break;
      case '.s':
        var query = encodeURIComponent(query);
        Meteor.http.call("GET", 'http://www.google.com/cse?cx=003507065920591675867%3Axyxvbg8-oie&ie=UTF-8&nojs=1&q='+query, {
          timeout: 30000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36'
          }
        }, function(error, response) {
          var links_selector = '.r a.l';
          var cheerio = Cheerio.load(response.content),
              links = cheerio(links_selector).map(function(i, el) { return el.attribs.href; });
          for (var i = 0; i < 3 && links[i]; ++i) {
            Bot.say("#" + (i+1) + " " + links[i]);
          }
        });
        break;
      case '.m':
        Meteor.call('imdb', query, function(error, result) {
          Bot.say(result);
        });
        break;
      case '.b':
        Meteor.call('coinbase', function(error, result) {
          Bot.say(result);
          Meteor.call('btce', function(error, result) {
            Bot.say(result);
          });
        });
        break;
      case '.d':
        Meteor.call('define', query, function(error, result) {
          if(result === '') {
            Meteor.call('urbandictionary', query, function(error, result) {
              Bot.say(result);
            });
          } else {
            Bot.say(result);
          }
        });
        break;
      case '.e':
        Meteor.call('eloquent', query, function(error, result) {
          Bot.say(result.join(' '));
        });
        break;
      case '.t':
        Meteor.call('chunk', query, function(error, result) {
          Bot.say(result.join(' '));
        });
        break;
      case '.l':
        Meteor.call('lastfm', query, function(error, result) {
          Bot.say(result);
        });
        break;
      case '.n':
        Meteor.call('nowplaying', query, function(error, result) {
          Bot.say(result);
        });
        break;
      case '.a':
        Bot.say(getSentiment(query));
        break;
      case '.p':
        Meteor.call('pinboard', query);
        break;
      case '.w':
        Meteor.call('wikipediaSearch', query, function(error, result) {
          Bot.say(result);
        });
        break;
      case '.4':
        Meteor.call('4chan', query, function(error, result) {
          Bot.say(result);
        });
        break;
      case '.r':
        Meteor.call('reddit', query, function(error, result) {
          Bot.say(result);
        });
        break;
      case '.g':
        Meteor.call('google', query, function(error, result) {
          Bot.say(result);
        });
        break;
      case '.u':
        Meteor.call('duckduckgo', query);
        break;
      case '.y':
        Meteor.call('youtube', query, function(error, result) {
          Bot.say(result);
        });
        break;
      case '.i':
        Meteor.call('imgur', query, function(error, result) {
          Bot.say(result);
        });
        break;
      default:
        break;
    }
  }
};
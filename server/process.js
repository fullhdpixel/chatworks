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
getNthWord = function(string, n){
  var words = string.split(" ");
  return words[n-1];
}

/**
 * Check for a URL in the current message, return the url
 * @param array
 * @returns {string}
 */
checkURL = function (array) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  array.forEach(function (msg) {
    if (msg.message.match(exp)) {
      return msg.message;
    }
  });
  return '';
}

/**
 * Derive some message sentiment, a wrapper for natural
 * this is a stub
 * @param msg
 * @returns {string}
 */
getPhonetics = function (msg) {
  var metaphone = natural.Metaphone;
  return metaphone.process(msg);
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
    } else if (processedMessage.indexOf('analyze') !== -1) { //todo function to slice off first word
      str = getPhonetics(processedMessage.slice(7));
    } else if (processedMessage === '<_<') {
      str = '>_>';
    } else if (processedMessage === '>_>') {
      str = '<_<';
    } else if (processedMessage.indexOf('chatworks') !== -1 || squeek < 0.01) {
      var msg = Messages.findOne({irc: true}, {skip: Math.floor(Math.random() * BOUNTY_COUNT)});
      if(msg)
        str = msg.message;
    } else if (processedMessage.indexOf('imgur') !== -1) {
      var query = processedMessage.slice(5);
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
    } else if (processedMessage.indexOf('lastfm') !== -1) {
      var query = processedMessage.slice(5);
      query = query.split(" ");
      if(query) {
        var response = Meteor.http.get('http://ws.audioscrobbler.com/2.0/?method=tasteometer.compare&type1=user&type2=artists&value1='+query[0]+'&value2='+query[1]+'&api_key=0c06119350d70df277d25b654afdb0e1&format=json');
        if (response.statusCode === 200) {
          var data = response.data;
          if(data) {
//            return " score: "+ JSON.stringify(data); ghetto debug
            return " score: "+ data.comparison.result.score;
          }
        }
      }
      return "...";
    }
  }
  return str;
};
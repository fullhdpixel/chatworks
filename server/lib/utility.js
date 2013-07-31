/**
 * Select a random element in a given array
 * @param array
 * @returns element
 */
Object.defineProperty(Array.prototype, 'random', {
	value : function () {
		return this[Math.floor(Math.random() * this.length)];
	},
	configurable : true,
	writable : true
});

/**
 * Creates a new array with all elements that pass the test implemented by the provided function
 * @param array
 * @returns {array}
 */
Object.defineProperty(Array.prototype, 'diff', {
  value: function(compareTo) {
    return this.filter(function(i) {
      return !(compareTo.indexOf(i.toLowerCase()) > -1);
    });
  },
  configurable : true,
 	writable : true
});


/**
 * Check the beginning of a string for x
 * @param string
 * @returns boolean
 */
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str) {
    return this.slice(0, str.length) == str;
  };
}

/**
 * Cleans the message up
 * @param msg
 * @returns {string}
 */
parseMessage = function (msg) {
  var message = msg.toLowerCase();
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
  var exp = /(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  return exp.test(msg);
}

/**
 * Get URLs in the current message
 * @param msg
 * @returns {array}
 */
getURL = function (msg) {
  var exp = /(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  return exp.exec(msg)[0];
}

/**
 * Get youtube ID
 * @param url
 * @returns boolean
 */
checkYoutube = function(url) {
  var exp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  return exp.test(url);
}

/**
 * Get youtube ID
 * @param url
 * @returns string
 */
getYoutubeId = function(url) {
  var exp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  return exp.exec(url)[2];
}

//these should all definitely be stored in a collection
fourohfour = [
  '(ﾉಥДಥ)ﾉ︵┻━ᔭ0ᔭ━┻･/'
  ,'(ノ ゜Д゜)ノ ︵ ┻━ᔭ0ᔭ━┻'
  ,'(╯°□°)╯︵ ┻━ᔭ0ᔭ━┻ '
  ,'ʕノ•ᴥ•ʔノ ︵ ┻━ᔭ0ᔭ━┻'
];
stoptags = [
  'google'
]
botCommands = {
  '.about': 'http://github.com/Pent/chatworks'
  ,'boop': 'boops'
  ,'>_>': '<_<'
  ,'<_<': '>_>'
};

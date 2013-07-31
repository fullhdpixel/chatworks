/**
 * AI responses to various triggers
 * @param handle msg
 * @returns void
 */
processMessage = function(handle, to, msg) {
  var split = msg.split(' ');
  var cmd = split[0];
  split.shift();
  var query = split.join(' ');
  if(!query) {
    var previousLine = Messages.find({bot: false}, {limit: 2, sort: {'date_time': -1}});
    query = previousLine.fetch()[1].message;
  }
  _.each(botCommands, function(val, key) {
    if(key === cmd) {
      if(key.startsWith('.')) {
        Meteor.call(val, to, query);
      } else {
        if(val === '') {
          Meteor.call(key, to, query);
        } else {
          Bot.say(to, val);
        }
      }
    }
  });
  //add url messages to url collection
  if (checkURL(msg)) {
    var url = getURL(msg);
    //check if url has http, append if not
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
       url = "http://" + url;
    }
    Urls.insert({
      url: url,
      date_time: new Date()
    });
  }
};
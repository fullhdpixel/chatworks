/**
 * Method for crafting a clever response
 */
Meteor.methods({
  choppa: function(handle, message) {
    var response = '';
    var pos = [];

    var analyze = Sentimental.analyze;
    var sentiment = analyze(message);
    console.log(sentiment);

    //split message into an array containing verb/noun/adjective/adverb/sense/unknown
    Meteor.call('getPos', message, function(error, response) {
      console.log(response);
      pos = response;
    });
    //analyze message
    if(pos[0] === 'noun') {
      if(pos[1] === config.botName) {
        if(sentiment.score < 0) {
          return '...';
        }
        return 'hi there, '+handle+'...';
      }
    }

    //check for action

    return response;
  }
});
botCommands['urdbandictionary'] = '';
Meteor.methods({
  'urbandictionary': function(to, query) {
    if(query) {
      Meteor.http.get('http://api.urbandictionary.com/v0/define?term='+query, function(error, response) {
        if (response.statusCode === 200) {
          var data = response.data;
          if(data.list[0]) {
            Bot.say(to, data.list[0].definition);
          }
        }
      });
    }
  }
});
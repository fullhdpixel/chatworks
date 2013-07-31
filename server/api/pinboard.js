botCommands['pinboard'] = '';
botCommands['tagger'] = '';
Meteor.methods({
  'pinboard': function(to, query) {
    if(query) {
      Meteor.http.get('https://api.pinboard.in/v1/posts/suggest?url='+query+'&auth_token='+config.pinboardApiKey+'&format=json', {timeout:30000}, function(error, response) {
        if (response.statusCode === 200) {
          var data = response.content;
          data = JSON.parse(data);
          if(data[1]) {
            Bot.say(to, data[1].recommended.join(' ') + "");
          }
        }
      });
    }
  },
  'tagger': function(to, query) {
    if(query) {
      Meteor.http.get('https://api.pinboard.in/v1/posts/suggest?url='+query+'&auth_token='+config.pinboardApiKey+'&format=json', function(error, response) {
        var data = response.content;
        data = JSON.parse(data);
        if(data[1]) {
          var tags = data[1].recommended.diff(stoptags);
          Bot.say(to, tags.join(', '));
        }
      });
    }
  }
});
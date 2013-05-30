Meteor.methods({
  'pinboard': function(query) {
    if(query) {
      Meteor.http.call("GET", 'https://api.pinboard.in/v1/posts/suggest?url='+query+'&auth_token='+config.pinboardApiKey+'&format=json', {timeout:30000}, function(error, response) {
        if (response.statusCode === 200) {
          var data = response.content;
          data = JSON.parse(data);
          if(data[1]) {
            Bot.say(data[1].recommended.join(' ') + "");
          }
        } else {
          Bot.say(fourohfour.random());
        }
      });
    }
  },
  'tagger': function(query) {
    if(query) {
      var response = Meteor.http.call("GET", 'https://api.pinboard.in/v1/posts/suggest?url='+query+'&auth_token='+config.pinboardApiKey+'&format=json')
      if (response.statusCode === 200) {
        var data = response.content;
        data = JSON.parse(data);
        if(data[1]) {
          return data[1].recommended.join(', ');
        }
      }
    }
  }
});
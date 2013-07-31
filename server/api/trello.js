Meteor.methods({
  trello: function(to, query) {
    Meteor.http.post('https://api.trello.com/1/cards?key='+config.trelloApiKey+'&token='+config.trelloToken+'&name='+query+'&desc=&idList='+config.trelloListId, function(error, response) {
      if (response.statusCode === 200) {
        var data = response.data;
        if(data) {
          Bot.say(to, data.url +" ("+data.name+")");
        }
      }
    });
  }
});
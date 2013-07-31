botCommands['imgur'] = '';
botCommands['.i'] = 'imgur';
Meteor.methods({
  imgur: function(to, query) {
    Meteor.http.get('https://api.imgur.com/3/gallery/search?q='+query,
      {headers: {'Authorization': 'Client-ID ' + config.imgurClientId}},
      function(error, response) {
        if (response.statusCode === 200) {
          var data = response.data;
          if(data.data[0]) {
            Bot.say(to, data.data[0].link +" ("+data.data[0].title+")");
          }
        }
      }
    );
  }
});
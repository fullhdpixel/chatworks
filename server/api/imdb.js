botCommands['imdb'] = '';
botCommands['.m'] = 'imdb';
Meteor.methods({
  imdb: function(to, query) {
    Meteor.http.get('http://imdbapi.org/?title='+query+'&type=json&plot=simple&episode=1&limit=1&yg=0&mt=none&lang=en-US&offset=&aka=simple&release=simple&business=0&tech=0', function(error, response) {
      if (response.statusCode === 200) {
        var data = response.content;
        data = JSON.parse(data);
        if(data[0]) {
          var date = ""+data[0].release_date;
          date = date.slice(0, 4) + "/" + date.slice(4,6) + "/" + date.slice(6,8);
          Bot.say(to, data[0].imdb_url+" ["+data[0].genres.join(', ')+"] ("+date+") ("+data[0].rating+"/10) " + data[0].plot_simple);
        }
      }
    });
  }
});
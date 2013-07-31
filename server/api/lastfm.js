botCommands['lastfm'] = '';
botCommands['np'] = '';
Meteor.methods({
  lastfm: function(to, query) {
    query = query.split(" ");
    if(query) {
      Meteor.http.call('GET', 'https://ws.audioscrobbler.com/2.0/?method=tasteometer.compare&type1=user&type2=user&value1='+query[0]+'&value2='+query[1]+'&api_key='+config.lastfmClientId+'&format=json', function(error, response) {
        if (response.statusCode === 200) {
          var data = response.data;
          if(data.comparison) {
            Bot.say(to, " compatibility: "+ (Number(data.comparison.result.score) / 100 * 10000).toFixed(2) +"%");
          }
        }
      });
    }
  },
  np: function(to, query) {
    query = query.split(" ");
    if(query[0]) {
      var np = '';
      Meteor.http.get('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+query[0]+'&api_key='+config.lastfmClientId+'&format=json', function(error, response) {
        if (response.statusCode === 200) {
          var data = response.data;
          if(typeof data.recenttracks != 'undefined') {
            var np = data.recenttracks.track[0].artist['#text'] +" - "+ data.recenttracks.track[0].name;
            Meteor.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+np+'&maxResults=1&safeSearch=none&type=video&key='+config.googleApiKey, function(error, youtube) {
              if (response.statusCode === 200) {
                var video = youtube.data;
                if(typeof video.items[0] != 'undefined') {
                  Bot.say(to, np + " http://youtube.com/watch?v="+video.items[0].id.videoId+" ("+video.items[0].snippet.title+")");
                }
              }
            });
          }
        }
      });
    }
  }
});
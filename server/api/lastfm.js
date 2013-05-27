Meteor.methods({
  lastfm: function(query) {
    query = query.split(" ");
    if(query) {
      var response = Meteor.http.call('GET', 'http://ws.audioscrobbler.com/2.0/?method=tasteometer.compare&type1=user&type2=user&value1='+query[0]+'&value2='+query[1]+'&api_key='+config.lastfmClientId+'&format=json');
      if (response.statusCode === 200) {
        var data = response.data;
        if(data.comparison) {
          return " compatibility: "+ (Number(data.comparison.result.score) / 100 * 10000).toFixed(2) +"%";
        }
      }
    }
    return fourohfour.random();
  },
  nowplaying: function(query) {
    query = query.split(" ");
    if(query[0]) {
      var response = Meteor.http.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+query[0]+'&api_key='+config.lastfmClientId+'&format=json');
      if (response.statusCode === 200) {
        var data = response.data;
        if(typeof data.recenttracks != 'undefined') {
          var essence = data.recenttracks.track[0].artist['#text'] +" - "+ data.recenttracks.track[0].name;
          var youtube = Meteor.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+essence+'&maxResults=1&safeSearch=none&type=video&key='+config.googleApiKey);
          if (response.statusCode === 200) {
            var video = youtube.data;
            if(typeof video.items[0] != 'undefined') {
              return essence + " http://youtube.com/watch?v="+video.items[0].id.videoId+" ("+video.items[0].snippet.title+")";
            }
          } else {
            return essence;
          }
        }
      }
    }
    return fourohfour.random();
  }
});
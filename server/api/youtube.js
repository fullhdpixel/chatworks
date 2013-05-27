Meteor.methods({
  youtube: function(query) {
    if(!query) {
      var msg = Messages.find({bot: false}, {limit: 2, sort: {'date_time': -1}});
      query = msg.fetch()[1].message;
    }
    var response = Meteor.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+query+'&maxResults=1&safeSearch=none&type=video&key='+config.googleApiKey);
    if (response.statusCode === 200) {
      var data = response.data;
      if(data.items[0]) {
        return "http://youtube.com/watch?v="+ data.items[0].id.videoId+" ("+data.items[0].snippet.title+")";
      }
    }
    return fourohfour.random();
  }
});
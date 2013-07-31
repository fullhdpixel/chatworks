botCommands['youtube'] = '';
botCommands['.y'] = 'youtube';
Meteor.methods({
  youtube: function(to, query) {
    Meteor.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+query+'&maxResults=1&safeSearch=none&type=video&key='+config.googleApiKey, function(error, response) {
      if (response.statusCode === 200) {
        var data = response.data;
        if(data.items[0]) {
          Bot.say('http://youtube.com/watch?v='+ data.items[0].id.videoId+' ('+data.items[0].snippet.title+')');
        }
      }
    });
  },
  addToPlaylist: function(youtubeId, access_token) {
    Meteor.http.post('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',
      {
        headers: {
          Authorization: 'Bearer ' + access_token,
          'content-type': 'application/json'
        },
        data: {
          kind: 'youtube#playlistItem',
          snippet: {
            playlistId: config.youtubePlaylist,
            resourceId: {
              videoId: youtubeId,
              kind: 'youtube#video'
            }
          }
        }
      },
      function(error, response) {
        if(error) {
          console.log(error);
        }
        if (response.statusCode === 200) {
            console.log('added to playlist: ' + youtubeId);
        }
      }
    );
  }

});
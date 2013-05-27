Meteor.methods({
  imgur: function(query) {
    if(!query) {
      var msg = Messages.find({bot: false}, {limit: 2, sort: {'date_time': -1}});
      query = msg.fetch()[1].message;
    }
    var response = Meteor.http.get('https://api.imgur.com/3/gallery/search?q='+query,
      {headers: {'Authorization': 'Client-ID ' + config.imgurClientId}});
    if (response.statusCode === 200) {
      var data = response.data;
      if(data.data[0]) {
        return data.data[0].link +" ("+data.data[0].title+")";
      }
    }
    return fourohfour.random();
  }
});
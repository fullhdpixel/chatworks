Meteor.methods({
  imdb: function(query) {
    if(!query) {
      var msg = Messages.find({bot: false}, {limit: 2, sort: {'date_time': -1}});
      query = msg.fetch()[1].message;
    }
    var response = Meteor.http.get('http://imdbapi.org/?title='+query+'&type=json&plot=simple&episode=1&limit=1&yg=0&mt=none&lang=en-US&offset=&aka=simple&release=simple&business=0&tech=0');
    if (response.statusCode === 200) {
      var data = response.content;
      data = JSON.parse(data);
      if(data[0]) {
        var date = ""+data[0].release_date;
        date = date.slice(0, 4) + "/" + date.slice(4,6) + "/" + date.slice(6,8);
        return data[0].imdb_url+" ["+data[0].genres.join(', ')+"] ("+date+") ("+data[0].rating+")";
      }
    }
    return fourohfour.random();
  }
});
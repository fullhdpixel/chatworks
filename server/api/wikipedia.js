Meteor.methods({
  wikipedia: function(query) {
    if(!query) {
      var msg = Messages.find({bot: false}, {limit: 2, sort: {'date_time': -1}});
      query = msg.fetch()[1].message;
    }
    var response = Meteor.http.get('http://en.wikipedia.org/w/api.php?action=parse&page='+query+'&prop=text&section=0&format=json');
    if (response.statusCode === 200) {
      var data = response.data;
      if(data.parse) {
        var cheerio = Cheerio.load(data.parse.text['*']);
        return cheerio('p').first().text();
      }
    }
    return fourohfour.random();
  }
});
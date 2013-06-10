Meteor.methods({
  google: function(query) {
    var customSearchEngine = '013036536707430787589:_pqjad5hr1a';
    if(!query) {
      var msg = Messages.find({bot: false}, {limit: 2, sort: {'date_time': -1}});
      query = msg.fetch()[1].message;
    }
    var queries = query.split(' ');
    var url = 'https://www.googleapis.com/customsearch/v1?key='+config.googleApiKey+'&cx='+customSearchEngine+'&q='+query+'&alt=json';
    if(checkURL(queries[0])) {
      var terms = queries.shift().join(' ');
      url = 'https://www.googleapis.com/customsearch/v1?key='+config.googleApiKey+'&siteSearch='+queries[0]+'&cx='+customSearchEngine+'&q='+terms+'&alt=json';
    } //todo: bypass process and also refactor, not returning url on site search
    var response = Meteor.http.get(url);
    if (response.statusCode === 200) {
      var data = response.data;
      //todo: find date inside items, for instance "e3 date" was query
      if(data.items[0]) {
        return data.items[0].link+" ("+data.items[0].title+")";
      }
    }
    return fourohfour.random();
  }
});
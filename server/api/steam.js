botCommands['steam'] = '';
Meteor.methods({
  steam: function(to, query) {
    var str = '';
    //todo: attach an associative array to take an input game name and convert to id
    Meteor.http.get('http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid='+query+'&count=1&maxlength=300&format=json', function(error, response) {
      if (response.statusCode === 200) {
        var data = response.data;
        var dat = data.appnews.newsitems[0];
        if(dat) {
          Bot.say(to, dat.url + ' (' + dat.title + ')');
        }
      }
    });
  },
  //todo TBC
  refreshNA: function(to, query) {
    console.log('hit');
    Meteor.http.call("GET", 'https://developer.valvesoftware.com/wiki/Steam_Application_IDs', {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36'
      }
    }, function(error, response) {
      if(error) {
        console.log(error);
      } else {
        var cheerio = Cheerio.load(response.content),
            filter = cheerio('ul').filter('li');
            games = filter.map(function(i, el) { return el.children; });
        for (var i = 0; i < 3 && games[i] ; ++i) {
          console.log(games[i]);
        }
      }
    });
  }
});
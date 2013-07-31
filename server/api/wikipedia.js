botCommands['wikipedia'] = '';
botCommands['wikipediaSearch'] = '';
botCommands['.w'] = 'wikipediaSearch';
Meteor.methods({
  wikipedia: function(to, query) {
    Meteor.http.get('http://en.wikipedia.org/w/api.php?action=parse&page='+query+'&prop=text&section=0&format=json', function(error, response) {
      if (response.statusCode === 200) {
        var data = response.data;
        if(data.parse) {
          var cheerio = Cheerio.load(data.parse.text['*']);
          Bot.say(to, cheerio('p').first().text());
        }
      }
    });
  },
  wikipediaSearch: function(to, query) {
    Meteor.http.get('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+query+'&srprop=snippet&format=json&limit=1', function(error, response) {
      if (response.statusCode === 200) {
        var data = response.data;
        if(data.query) {
          Bot.say(to, data.query.search[0].title + ": " + data.query.search[0].snippet.replace(/<(?:.|\n)*?>/gm, '') + " http://en.wikipedia.org/wiki/" + data.query.search[0].title.replace(/ /g,"_"));
        }
      }
    });
  }
});
//todo: broken for js generated pages
Meteor.methods({
  title: function(to, url) {
    Meteor.http.call("GET", url, {
      timeout: 30000,
      followRedirects: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36'
      }
    }, function(error, response) {
      if(response.content !== null) {
        var cheerio = Cheerio.load(response.content); //todo: occasional exception from null content
        cheerio.html();
        Bot.say(to, "" + cheerio('title').text());
      }
    });
  }
});
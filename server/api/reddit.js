botCommands['reddit'] = '';
botCommands['randit'] = '';
Meteor.methods({
  'reddit': function(to, query) {
    if(query) {
      Meteor.http.get('http://www.reddit.com/r/'+query+'/new.json', function(error, response) {
        if (response.statusCode === 200) {
          var data = response.data;
          if(data.data.children[0]) {
            Bot.say(to, 'http://reddit.com'+data.data.children[0].data.permalink+' ('+data.data.children[0].data.title+')');
          }
        }
      });
    }
  },
  //todo: reddit returns same result over x period, use a fallback
  //todo: add timeouts to all http functions and caching of responses
  'randit': function(to, query) {
    if(query) {
      Meteor.http.get('http://www.reddit.com/r/'+query+'/random.json',
        {timeout: 5000},
        function(error, response) {
          if (response.statusCode === 200) {
            var data = response.data;
            if(data[0].data.children[0]) {
              Bot.say(to, data[0].data.children[0].data.title);
            }
          }
        }
      );
    }
  }
});
botCommands['duckduckgo'] = '';
botCommands['.ddg'] = 'duckduckgo';
Meteor.methods({
  duckduckgo: function(to, query) {
    Meteor.http.get('http://api.duckduckgo.com/?q='+query+'&format=json', function(error, result) {
      var data = JSON.parse(result.content);
      if(typeof data.Results[0] != 'undefined') {
        Bot.say(to, data.Results[0].FirstURL+" ("+data.Results[0].Text+")");
      } else if(typeof data.RelatedTopics[1] != 'undefined') {
        Bot.say(to, data.RelatedTopics[1].Topics[0].FirstURL+" ("+data.RelatedTopics[1].Topics[0].Text+")");
      } else {
        Bot.say(to, 'duckduckfuck');
      }
    });
  }
});
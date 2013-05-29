Meteor.methods({
  duckduckgo: function(query) {
    if(!query) {
      var msg = Messages.find({bot: false}, {limit: 2, sort: {'date_time': -1}});
      query = msg.fetch()[1].message;
    }
    Meteor.http.get('http://api.duckduckgo.com/?q='+query+'&format=json', function(error, result) {
      var data = JSON.parse(result.content);
      if(typeof data.Results[0] != 'undefined') {
        Bot.say(data.Results[0].FirstURL+" ("+data.Results[0].Text+")");
      } else if(typeof data.RelatedTopics[1] != 'undefined') {
        Bot.say(data.RelatedTopics[1].Topics[0].FirstURL+" ("+data.RelatedTopics[1].Topics[0].Text+")");
      } else {
        Bot.say('API proudly demonstrated by DUCKDUCKGO');
      }
    });
  }
});
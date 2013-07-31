botCommands['coinbase'] = '';
Meteor.methods({
  coinbase: function(to) {
    Meteor.http.get('https://coinbase.com/api/v1/prices/buy', function(error, response) {
      if (response.statusCode === 200) {
        var data = response.data;
        if(data.currency) {
          Bot.say(to, 'Coinbase BTC: ' + data.amount + ' ' + data.currency);
        }
      }
    });
  }
});
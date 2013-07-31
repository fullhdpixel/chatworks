botCommands['btce'] = '';
Meteor.methods({
  btce: function(to) {
    var str = '';
    Meteor.http.get('https://btc-e.com/api/2/btc_usd/ticker', function(error, response) {
      if (response.statusCode === 200) {
        var data = response.content;
        data = JSON.parse(data);
        if(data.ticker) {
          str = ("BTC-E: BTC->USD: [" + data.ticker.avg + "]");
          Meteor.http.get('https://btc-e.com/api/2/ltc_btc/ticker', function(error, response) {
            if (response.statusCode === 200) {
              var data = response.content;
              data = JSON.parse(data);
              if(data.ticker) {
                str += (" LTC->BTC: [" + data.ticker.avg+"]");
                Meteor.http.get('https://btc-e.com/api/2/ltc_usd/ticker', function(error, response) {
                  if (response.statusCode === 200) {
                    var data = response.content;
                    data = JSON.parse(data);
                    if(data.ticker) {
                      str += (" LTC->USD: [" + data.ticker.avg+"]");
                      Bot.say(to, str);
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
  }
});
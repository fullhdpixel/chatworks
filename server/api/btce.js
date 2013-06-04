Meteor.methods({
  btce: function() {
    var str = '';
    var response = Meteor.http.get('https://btc-e.com/api/2/btc_usd/ticker');
    if (response.statusCode === 200) {
      var data = response.content;
      data = JSON.parse(data);
      if(data.ticker) {
        str = (" BTC->USD: [" + data.ticker.avg + "]");
        var response = Meteor.http.get('https://btc-e.com/api/2/ltc_btc/ticker');
        if (response.statusCode === 200) {
          var data = response.content;
          data = JSON.parse(data);
          if(data.ticker) {
            str += (" LTC->BTC: [" + data.ticker.avg+"]");
            var response = Meteor.http.get('https://btc-e.com/api/2/ltc_usd/ticker');
            if (response.statusCode === 200) {
              var data = response.content;
              data = JSON.parse(data);
              if(data.ticker) {
                str += (" LTC->USD: [" + data.ticker.avg+"]");
              }
            }
          }
        }
      }
    }
    return str;
  }
});
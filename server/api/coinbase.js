Meteor.methods({
  coinbase: function() {
    var response = Meteor.http.get('https://coinbase.com/api/v1/prices/buy');
    if (response.statusCode === 200) {
      var data = response.data;
      if(data.currency) {
        return "Coinbase BTC: " + data.amount + " " + data.currency;
      }
    }
    return fourohfour.random();
  }
});
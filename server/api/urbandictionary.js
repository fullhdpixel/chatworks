Meteor.methods({
  'urbandictionary': function(query) {
    if(query) {
      var response = Meteor.http.get('http://api.urbandictionary.com/v0/define?term='+query);
      if (response.statusCode === 200) {
        var data = response.data;
        if(data.list[0]) {
          return data.list[0].definition;
        }
      }
    }
    return fourohfour.random();
  }
});
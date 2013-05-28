
Meteor.methods({
  'reddit': function(query) {
    if(query) {
      var response = Meteor.http.get('http://www.reddit.com/r/'+query+'/new.json');
      if (response.statusCode === 200) {
        var data = response.data;
        if(data.data.children[0]) {
          return data.data.children[0].data.title;
        }
      }
    }
    return fourohfour.random();
  }
});
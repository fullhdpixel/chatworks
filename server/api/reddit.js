Meteor.methods({
  'reddit': function(query) {
    if(query) {
      var response = Meteor.http.get('http://www.reddit.com/r/'+query+'/new.json');
      if (response.statusCode === 200) {
        var data = response.data;
        if(data.data.children[0]) {
          return 'http://reddit.com'+data.data.children[0].data.permalink+' ('+data.data.children[0].data.title+')';
        }
      }
    }
    return fourohfour.random();
  },
  //todo: reddit returns same result over x period, use a fallback
  'randit': function(query) {
    if(query) {
      var response = Meteor.http.get('http://www.reddit.com/r/'+query+'/random.json');
      if (response.statusCode === 200) {
        var data = response.data;
        console.log(JSON.stringify(data[0].data.children[0].data.title));
        if(data[0].data.children[0]) {
          return data[0].data.children[0].data.title;
        }
      }
    }
    return fourohfour.random();
  }
});
Meteor.methods({
  '4chan': function(query) {
    if(query) {
      var response = Meteor.http.get('http://api.4chan.org/'+query+'/catalog.json');
      if (response.statusCode === 200) {
        var data = response.data;
        if(data[0]) {
          return "http://images.4chan.org/"+query+"/src/"+data[0].threads[0].tim+data[0].threads[0].ext+" ("+data[0].threads[0].now+") http://boards.4chan.org/"+query+"/res/"+data[0].threads[0].no;
        }
      }
    }
    return fourohfour.random();
  }
});
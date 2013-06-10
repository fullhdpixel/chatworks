Meteor.methods({
  trello: function(query) {
    if(!query) {
      return fourohfour.random();
    }
    var response = Meteor.http.post('https://api.trello.com/1/cards?key='+config.trelloApiKey+'&token='+config.trelloToken+'&name='+query+'&desc=&idList='+config.trelloListId);
    if (response.statusCode === 200) {
      var data = response.data;
      if(data) {
        return data.url +" ("+data.name+")";
      }
    }
    return fourohfour.random();
  }
});
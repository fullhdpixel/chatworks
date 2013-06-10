//meteor_irc
function getLeaderBoardFromMap(map) {
  var results;
  results = _.map(map, function(count, name) {
    return {
      name: name,
      count: count
    };
  });
  results = _.sortBy(results, function(person) {
    return person.count * -1;
  });
  return results.slice(0, 5);
}
//

Template.analysis.helpers({
  today: function() {
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    return Messages.find({date_time: {$gte: today}}).count();
  },
  top: function() {
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    var messages = Messages.find({date_time: {$gte: today}});
    var countMap = {};
    messages.forEach(function(message) {
      if(!_.has(countMap, message.handle)) {
        return countMap[message.handle] = 1;
      }
      countMap[message.handle] += 1;
    });
    return getLeaderBoardFromMap(countMap);
  },
  online: function() {
    var names;
    names = Names.find({room_id: Session.get('room_id')}, {sort: {date_time: -1}, limit: 1}).fetch();
    if (_.isEmpty(names)) {
      return 0;
    }
    return names[0].names.length;
  },
  showStats: function() {
    return Session.get('show_stats');
  }
});
Template.analysis.helpers({
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
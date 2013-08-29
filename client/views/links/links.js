Template.links.helpers({
  linksForRoom: function() {
    return Links.find({}, {sort: {date_time: -1}});
  },
  datesForRoom: function() {
    return Dates.find({});
  }
});

Template.links.created = function() {
  Session.set('limit', 10);
};
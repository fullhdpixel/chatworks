Template.links.helpers({
  linksForRoom: function() {
    return Urls.find({}, {sort: {date_time: -1}});
  },
  datesForRoom: function() {
    return Dates.find({});
  }
});

Template.links.created = function() {
  urlsHandle.loadNextPage();
};
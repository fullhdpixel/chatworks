Template.links.helpers({
  linksForRoom: function() {
    var options = {
      sort: this.sort,
      limit: this.limit
    };
    return Urls.find({}, options);
  },
  datesForRoom: function() {
    return Dates.find({});
  }
});
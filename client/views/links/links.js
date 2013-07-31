Template.links.helpers({
  options: function() {
    return {
      sort: {date_time: 1},
      handle: urlsHandle
    }
  }
});

Template.linksPage.helpers({
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
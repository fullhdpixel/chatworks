Template.newLinks.helpers({
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

Template.loadMoreLinks.helpers({
  linksReady: function() {
    return this.handle.ready();
  },
  allLinksLoaded: function() {
    return !this.handle.ready() && Urls.find({}).count() < this.handle.loaded();
  }
});

Template.loadMoreLinks.events = {
  'click .load-more': function(event) {
    Session.set('auto_scroll', false);
    event.preventDefault();
    this.handle.loadNextPage();
  }
};
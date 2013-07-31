Template.loadMoreLinks.helpers({
  linksReady: function() {
    return urlsHandle.ready();
  },
  allLinksLoaded: function() {
    return !urlsHandle.ready() && Urls.find({}).count() < urlsHandle.loaded();
  }
});

Template.loadMoreLinks.events = {
  'click .load-more': function(event) {
    Session.set('auto_scroll', false);
    event.preventDefault();
    urlsHandle.loadNextPage();
  }
};
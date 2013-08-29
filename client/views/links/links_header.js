Template.loadMoreLinks.helpers({
  linksReady: function() {
    return linksHandle.ready();
  },
  allLinksLoaded: function() {
    return linksHandle.allLoaded();
  }
});

Template.loadMoreLinks.events = {
  'click .load-more': function(event) {
    event.preventDefault();
    var limit = Number(Session.get('limit')) + 5;
    Session.set('limit', limit);
  }
};
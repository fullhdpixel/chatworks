Template.newMessages.helpers({
  options: function() {
    return {
      sort: {date_time: 1},
      handle: messagesHandle
    }
  }
});

Template.chatPage.helpers({
  messagesForRoom: function() {
    var options = {
      sort: this.sort,
      limit: this.limit
    };
    return Messages.find({}, options);
  }
});

Template.showStats.helpers({
  showStats: function() {
    return Session.get('show_stats');
  }
});

Template.loadMore.helpers({
  messagesReady: function() {
    return this.handle.ready();
  },
  allMessagesLoaded: function() {
    return !this.handle.ready() && Messages.find({}).count() < this.handle.loaded();
  }
});

Template.loadMore.events = {
  'click .load-more': function(event) {
    Session.set('auto_scroll', false);
    event.preventDefault();
    this.handle.loadNextPage();
  }
};

Template.showStats.events = {
  'click .show-stats': function(event) {
    if(Session.get('show_stats') === false) {
      Session.set('show_stats', true);
    } else {
      Session.set('show_stats', false);
    }
    event.preventDefault();
  }
};
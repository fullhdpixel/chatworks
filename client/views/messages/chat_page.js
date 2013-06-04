Template.newMessages.helpers({
  options: function() {
    return {
      sort: {date_time: 1},
      handle: newMessagesHandle
    }
  }
});

Template.topMessages.helpers({
  options: function() {
    return {
      sort: {stars: 1},
      handle: newMessagesHandle
    }
  }
});

Template.chatPage.helpers({
  messagesForRoom: function() {
    var options = {sort: this.sort};
    return Messages.find({}, options);
  }
});

Template.chatPage.events = {
};

Template.loadMore.helpers({
  messagesReady: function() {
    return this.handle.ready();
  },
  allMessagesLoaded: function() {
    return !this.handle.loading() &&
      Messages.find({}).count() < this.handle.loaded();
  }
});

Template.loadMore.events = {
  'click .load-more': function(event) {
    Session.set('auto_scroll', false);
    event.preventDefault();
    this.handle.loadNextPage();
  }
};
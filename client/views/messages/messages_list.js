Template.messagesList.helpers({
  messagesForRoom: function() {
    return Messages.find({room_id: Session.get('room_id')}, {sort: {date_time: 1}, skip: -messagesHandle.limit()});
  },
  messagesReady: function() {
    return !messagesHandle.loading();
  },
  allMessagesLoaded: function() {
    return !messagesHandle.loading() &&
      Messages.find({room_id: Session.get('room_id')}).count() < messagesHandle.loaded();
  },
  totalMessages: function() {
    return Messages.find({}).count(); //todo: fix count, only displays current max subscribed
  },
  loadedMessages: function() {
    return messagesHandle.loaded();
  }
});

Template.messagesList.events = {
  'click': function(evt) {
    SCROLL = false;
  },
  'click .load-more': function(event) {
    event.preventDefault();
    messagesHandle.loadNextPage();
  }
};
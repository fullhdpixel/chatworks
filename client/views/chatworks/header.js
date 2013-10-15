Template.chatworksHeader.helpers({
  currentRoom: function() {
    return Session.get('chatworks-chatroom');
  }
});

Template.chatworksHeader.helpers({
  sidebarOpen: function() {
    return Session.get('chatworks-sidebar');
  }
});

Template.chatworksSidebarButton.events({
  'click': function(event, template) {
    $('#chatworks-users').toggleClass('icon-rotate-90');
    $('#chatworks-messages').toggleClass('slide-away');
  }
});

Template.chatworksLoadMoreButton.helpers({
  messagesReady: function() {
    return chatworksMessagesHandle.ready();
  },
  allMessagesLoaded: function() {
    return chatworksMessagesHandle.done();
  }
});

Template.chatworksLoadMoreButton.events = {
  'click .load-more': function(event) {
    event.preventDefault();
    autoScroll = false;
    chatworksMessagesHandle.loadMore(10);
  }
};
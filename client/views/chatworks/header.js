Template.chatworksHeader.helpers({
  currentRoom: function() {
    return Session.get('chatworks-room');
  },
  socketIP: function() {
    return Session.get('socketIP');
  }
});

Template.chatworksHeader.helpers({
  sidebarOnline: function() {
    return Session.get('chatworks-online');
  },
  sidebarRooms: function() {
    return Session.set('chatworks-rooms');
  }
});

Template.chatworksOnlineButton.events({
  'click': function(event, template) {
    if(Session.get('state') === 'online-open') {
      Session.set('state', undefined);
    } else {
      Session.set('state', 'online-open');
    }
  }
});

Template.chatworksRoomsButton.events({
  'click': function(event, template) {
    if(Session.get('state') === 'rooms-open') {
      Session.set('state', undefined);
    } else {
      Session.set('state', 'rooms-open');
    }
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
  'click': function(event) {
    chatworksMessagesHandle.loadMore(10);
  }
};

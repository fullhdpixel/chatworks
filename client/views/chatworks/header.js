Template.chatworksHeader.helpers({
  currentRoom: function() {
    return Session.get('chatworksRoom');
  },
  connectionStatus: function() {
    return Meteor.status().status;
  },
  autoscroll: function() {
    return Session.get('autoscroll') ? 'on' : 'off';
  }
});

Template.chatworksHeader.helpers({
  sidebarOnline: function() {
    return Session.get('chatworksOnline');
  },
  sidebarRooms: function() {
    return Session.get('chatworksRooms');
  }
});

Template.chatworksOnlineButton.events({
  'click': function(event, template) {
    if(Session.get('state') === 'chatworks-online-open') {
      Session.set('state', undefined);
    } else {
      Session.set('state', 'chatworks-online-open');
    }
  }
});

Template.chatworksRoomsButton.events({
  'click': function(event, template) {
    if(Session.get('state') === 'chatworks-rooms-open') {
      Session.set('state', undefined);
    } else {
      Session.set('state', 'chatworks-rooms-open');
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
    Session.set('autoscroll', undefined);
    chatworksMessagesHandle.loadMore(10);
  }
};

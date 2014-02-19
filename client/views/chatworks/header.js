Template.chatworksHeader.helpers({
  currentRoom: function() {
    return Session.get('chatworks-room');
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
    $('#chatworks-online').toggle();
    $('#chatworks-rooms').hide();
    $('#chatworks-messages').toggleClass('slide-away');
    var msgs = $('#chatworks-messages');
    if($('#chatworks-online').is(':visible')) {
      $('#chatworks-online-button').addClass('active');
      $('#chatworks-rooms-button').removeClass('active');
      msgs.addClass('slide-away');
    } else {
      msgs.removeClass('slide-away');
      $('#chatworks-online-button').removeClass('active');
    }
  }
});

Template.chatworksRoomsButton.events({
  'click': function(event, template) {
    $('#chatworks-rooms').toggle();
    $('#chatworks-online').hide();
    var msgs = $('#chatworks-messages');
    if($('#chatworks-rooms').is(':visible')) {
      $('#chatworks-rooms-button').addClass('active');
      $('#chatworks-online-button').removeClass('active');
      msgs.addClass('slide-away');
    } else {
      msgs.removeClass('slide-away');
      $('#chatworks-rooms-button').removeClass('active');
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
    event.preventDefault();
    autoScroll = false;
    chatworksMessagesHandle.loadMore(10);
  }
};

Template.chatworksRoom.events = {
  'click .room': function(event) {
    event.preventDefault();
    Session.set('chatworks-room', this.name);
    chatworksMessagesHandle.changeRoom(this.name);
    $("#message").focus();
  }
};
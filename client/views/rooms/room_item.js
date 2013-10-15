Template.roomItem.events = {
  'click .room': function(event) {
    event.preventDefault();
    Session.set('limit', '10');
    chatworksMessagesHandle.changeRoom(this.room);
    $("#message").focus();
  }
};
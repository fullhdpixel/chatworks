Template.roomItem.events = {
  'click': function() {
    Session.set('room', this.name);
    messagesHandle.changeRoom(this.name);
    urlsHandle.changeRoom(this.name);
    $("#message").focus();
  }
};
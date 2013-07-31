Template.roomItem.events = {
  'click': function() {
    Session.set('room_id', this.name);
    messagesHandle.roomChange();
  }
};
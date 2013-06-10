Template.roomItem.events = {
  'click': function() {
    Session.set('room_id', this.room_id);
    messagesHandle.roomChange();
  }
};
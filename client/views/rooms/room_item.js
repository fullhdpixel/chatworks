Template.roomItem.events = {
  'click': function() {
    Session.get('messagesLoaded', false);
    Session.set('room_id', this.room_id);
  }
};
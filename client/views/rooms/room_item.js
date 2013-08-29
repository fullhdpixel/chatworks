Template.roomItem.events = {
  'click': function() {
    Session.set('limit', 10);
    Session.set('room', this.name);
    $("#message").focus();
  }
};
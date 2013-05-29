Template.messagesList.helpers({
  messagesForRoom: function() {
    return Messages.find({room_id: Session.get('room_id')});
  },
  messagesLoaded: function () {
    return Session.get('messagesLoaded');
  }
});

Template.messagesList.events = {
  'click': function(evt) {
    SCROLL = false;
  }
};

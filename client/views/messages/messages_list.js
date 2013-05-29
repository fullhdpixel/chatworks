Template.messagesList.helpers({
  messagesForRoom: function() {
    return Messages.find({room_id: Session.get('room_id')}, {limit: 5});
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

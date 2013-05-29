Template.messagesList.helpers({
  messagesForRoom: function() {
    return Messages.find();
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

Meteor.autosubscribe(function() {
  Meteor.subscribe('rooms');
  Meteor.subscribe('messages', function onComplete() {
    Session.set('messagesLoaded', true);
    scrollToBottom();
    return Messages.find({'room_id': ext}).observe({
      added: function() {
        scrollToBottom();
      }
    });
  });
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
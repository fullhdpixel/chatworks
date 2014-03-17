var pingTimer = 10000;

Meteor.startup(function() {
  // periodically ping users to check for online status
  Meteor.call('onlineCheck', function(error, result) {
    Session.set('socketIP', result);
  });
  Meteor.setInterval(function(){
    Meteor.call('onlineCheck');
  }, pingTimer);
});

/**
 * Auto-scroll the chat to the bottom
 * @param handle
 * @returns {}
 */
scrollToBottom = function() {
  $('#chatworks-messages').animate({scrollTop: 999999}, 200);
};

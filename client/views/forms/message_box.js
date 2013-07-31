Template.messageBox.events = {
  'click button, keyup input, focusin input': function(event) {
    Session.set('auto_scroll', true);
    var textbox = $('#message').val().substring(0,400);
    var handle = 'anonymous';

    // if we tapped the button or hit enter
    if (event.type === 'click' || (event.type === 'keyup' && event.which === 13)) {

      if (Meteor.user()) { // must be logged in to use a real nickname
        if(_.isEmpty(Meteor.user().username)) {
          handle = Meteor.user().profile.name;
        } else {
          handle = Meteor.user().username;
        }
      }

      var message = {
        handle: handle,
        room_id: Session.get('room_id'),
        message: textbox
      };
      Meteor.call('addMessage', message);

      $("#message").val('');
      $("#message").focus();
    }
  },
  'focusin input, click input': function() {
    scrollToBottom();
  }
};

Template.messageBox.rendered = function() {
  $("#message").focus();
};
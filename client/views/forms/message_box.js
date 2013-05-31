Template.messageBox.events = {
  'click button, keyup input, focusin input': function(evt) {
    SCROLL = true;
    var textbox = $('#message').val().substring(0,400);

    // if we tapped the button or hit enter
    if (evt.type === 'click' || (evt.type === 'keyup' && evt.which === 13)) {

      if (Meteor.user()) { // must be logged in to use a real nickname
        handle = Meteor.user().username;
      } else {
        handle = 'anonymous';
      }

      var hue = colorHandle(handle);
      var message = {
        handle: handle,
        room_id: Session.get('room_id'),
        message: textbox,
        color: hue
      };
      Meteor.call('add_message', message, function(error, id) {
        if(error) {
          throwError("error: " + error.reason);
        }
      });

      $("#message").val('');
      $("#message").focus();
    }
  },
  'focusin input, click input': function(evt) {
    scrollToBottom();
  }
};
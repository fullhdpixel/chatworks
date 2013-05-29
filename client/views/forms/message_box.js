Template.messageBox.events = {
  'click button, keyup input, focusin input': function(evt) {
    SCROLL = true;
    // trim handle & textbox
    var handle = $('#handle').val().substring(0,32);
    var textbox = $('#message').val().substring(0,200);

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
          throwError("error: "+error.reason);
        }
      });

      $("#handle").val(handle);
      $("#handle-counter").text(32 - $("#handle").val().length);
      $("#message-counter").text(200);
      $("#message").val('');
      $("#message").focus();
      scrollToBottom();
    }
    if (evt.type === 'keyup') {
      var remainingx = 32 - $("#handle").val().length;
      $("#handle-counter").text(remainingx);
      var remainingy = 200 - $("#message").val().length;
      $("#message-counter").text(remainingy);
      var text = $('label#handle').text();
    }
  }
};
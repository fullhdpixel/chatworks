Template.chatworksMessageBox.events = {
  'click button, keyup input': function(event) {
    // if we tapped the send button or hit enter
    if (event.type === 'click' || (event.type === 'keyup' && event.which === 13)) {
      var textbox = $('#message').val();

      // add the message using a server-side call
      Meteor.call('addMessage', Session.get('chatworks-room'), textbox);

      // reset message box
      $('#message').val('');
      $('#message').focus();
    }
  }
};

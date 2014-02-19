Template.chatworksMessageBox.events = {
  'click button, keyup input, focusin input': function(event, template) {
    // autoscroll the chat when focused on the message box
    autoScroll = true;

    // if we tapped the send button or hit enter
    if (event.type === 'click' || (event.type === 'keyup' && event.which === 13)) {
      var textbox = template.find('.message').value;

      // add the message using a server-side call
      Meteor.call('addMessage', Session.get('chatworks-room'), textbox);

      // reset message box
      template.find('.message').value = '';
      template.find('.message').focus();
    }
  },
  'focusin input, click input': function() {
    scrollToBottom();
  }
};

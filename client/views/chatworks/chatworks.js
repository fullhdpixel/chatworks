Template.chatworks.helpers({
  state: function() {
    return Session.get('state');
  },
  overlay: function() {
  	return Session.get('overlay');
  }
});

Template.chatworksRoom.events = {
  'click .room': function(event) {
    event.preventDefault();
    Session.set('chatworksRoom', this.name);
    chatworksMessagesHandle.changeRoom(this.name);
    $("#message").focus();
  }
};

Deps.autorun(function() {
	if(Session.get('overlay')) {
		$('.chatworks-overlay').removeClass('chatworks-tiny');
	} else {
		$('.chatworks-overlay').addClass('chatworks-tiny');
	}
})
Template.chatworksOverlay.events({
	'click .chatworks-create-room': function() {
		Meteor.call('createRoom', $('.chatworks-room-name').val(), function(err, res) {
			if(!err) {
				Session.set('overlay', undefined);
			} else {
				Session.set('error', err);
			}
		});
	}	
});

Template.chatworksOverlay.helpers({
	error: function() {
		return Session.get('error');
	}
});
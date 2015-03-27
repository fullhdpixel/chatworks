Template.chatworksMessageBox.events = {
    'click button, keyup input': function(event) {
        if (event.type === 'click' || (event.type === 'keyup' && event.which === 13)) {
            var textbox = $('#message').val();

            var username = Meteor.user().services.twitter.screenName;

            Meteor.call('addMessage', Session.get('chatworksRoom'), username, textbox);

            $('#message').val('');
            $('#message').focus();
        }
    }
};

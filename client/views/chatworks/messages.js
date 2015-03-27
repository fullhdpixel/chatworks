Template.chatworksMessages.helpers({
    messages: function() {
        return ChatworksMessages.find({}, {
            sort: {
                ts: 1
            }
        }).fetch();
    }
});

Template.chatworksMessages.rendered = function() {
    setTimeout(function() {
        var username = Meteor.user().services.twitter.screenName;

        $("#chatworks-messages").bind("DOMSubtreeModified", function() {
            setTimeout(function() {
                console.log('username: ' + username);

                var lastmessage = $('.message').last().text();
                console.log(lastmessage);
                if (lastmessage.indexOf(username) > -1) {
                    var audio = new Audio('./sound/notification.mp3');
                    audio.play();
                }
            }, 500);
        });
    }, 500);
}

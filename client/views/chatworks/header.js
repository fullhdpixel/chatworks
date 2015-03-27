Template.chatworksHeader.helpers({
    connectionStatus: function() {
        return Meteor.status().status;
    },
    autoscroll: function() {
        return Session.get('autoscroll') ? 'on' : 'off';
    }
});

Template.chatworksHeader.events({
    'click #autoscrolltoggle': function(event) {
        event.preventDefault();
        var autoscroll = Session.get('autoscroll');
        if (autoscroll == true) {
            Session.set('autoscroll', false);
        } else {
            Session.set('autoscroll', true);
        }
    }
});

Template.chatworksHeader.helpers({
    sidebarOnline: function() {
        return Session.get('chatworksOnline');
    }
});

Template.chatworksOnlineButton.events({
    'click': function(event, template) {
        if (Session.get('state') === 'chatworks-online-open') {
            Session.set('state', undefined);
        } else {
            Session.set('state', 'chatworks-online-open');
        }
    }
});

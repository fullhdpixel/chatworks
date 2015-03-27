Template.chatworksOnline.helpers({
    users: function() {
        return Meteor.users.find().fetch();
    }
});

Template.onlineUser.events({
    'click span.handle': function(event) {
        $('.hilite').removeClass('hilite');
        if (Session.get('handleFind') !== this.handle) {
            $('span:contains(' + this.handle + ')').parent().addClass('hilite');
            Session.set('handleFind', this.handle);
        } else {
            Session.set('handleFind', undefined);
        }

        $this = $(event.target);
        var handle = $this.attr('data-user');
        var currentmsg = $('#message').val();
        if (currentmsg.search(handle) == -1) {
            $('#message').val(currentmsg == '' ? handle + ' ' : currentmsg + ' ' + handle + ' ');
            $('#message').focus();
        }
    }
})

Template.onlineUser.rendered = function() {
    var user = $(this.find('.handle')).attr('data-user');
    $(this.find('span')).css('color', colorHandle(user));
}

Handlebars.registerHelper('ifstatus', function(username) {
    if (username == 'fullhdpixel') {
        var result = username + ' (dev)';
    } else if (username == 'smokin35' || username == 'hispanicgirlbtc') {
        var result = username + ' (admin)';
    } else {
        var result = username;
    }

    try {
        var status = Meteor.users.findOne({
            'services.twitter.screenName': username
        });

        if (status.profile.online === true) {
            var img = './img/online.png';
        } else {
            var img = './img/offline.png';
        }
    } catch (e) {
        var img = './img/offline.png';
    }

    return '<img src="' + img + '" class="status"/> ' + result;
});

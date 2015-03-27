Template.chatworksMessage.helpers({
    prettyTime: function() {
        if (!this["ts"]) return "";
        var val = this["ts"];
        var parsed = new Date(val);
        return '' + (parsed.getMonth() + 1) + '/' + parsed.getDate() + ' ' + ('0' + parsed.getHours()).substr(-2, 2) + ':' + ('0' + parsed.getMinutes()).substr(-2, 2);
    }
});

Template.chatworksMessage.events({
    'click span.handle': function(event) {
        $('.hilite').removeClass('hilite');
        if (Session.get('handleFind') !== this.handle) {
            $('span:contains(' + this.handle + ')').parent().addClass('hilite');
            Session.set('handleFind', this.handle);
        } else {
            Session.set('handleFind', undefined);
        }

        $this = $(event.target);
        var handle = $this.text();
        var currentmsg = $('#message').val();
        if (currentmsg.search(handle) == -1) {
            $('#message').val(currentmsg == '' ? handle + ' ' : currentmsg + ' ' + handle + ' ');
            $('#message').focus();
        }
    }
});

Template.chatworksMessage.rendered = function() {
    $(this.find('.message')).children('.handle').css('color', colorHandle(this.data.handle));
    $(this.find('.message')).addClass('chatworks-boom');
    if (Session.get('autoscroll')) {
        $('#chatworks-messages').scrollTop(99999);
    }

    var user = capitalize($('.handle').last().text());
    var message = $('.message').last().text();

    $.titleAlert(user + ": " + message, {
        requireBlur: true,
        stopOnFocus: true,
        duration: 10000,
        interval: 500
    });
};

Handlebars.registerHelper('parseURL', function(text) {
    var re = /(\(.*?)?\b((?:https?|ftp|file):\/\/[-a-z0-9+&@#\/%?=~_()|!:,.;]*[-a-z0-9+&@#\/%=~_()|])/ig;
    return text.replace(re, function(match, lParens, url) {
        var rParens = '';
        lParens = lParens || '';
        var lParenCounter = /\(/g;
        while (lParenCounter.exec(lParens)) {
            var m;
            if (m = /(.*)(\.\).*)/.exec(url) ||
                /(.*)(\).*)/.exec(url)) {
                url = m[1];
                rParens = m[2] + rParens;
            }
        }
        return lParens + "<a href='" + url + "' target='_blank'>" + url + "</a>" + rParens;
    });
});

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

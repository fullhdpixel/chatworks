Template.chatworksMessage.helpers({
  prettyTime: function() {
    if(!this["ts"]) return "";
    var val = this["ts"];
    var parsed = new Date(val);
    return ''+(parsed.getMonth()+1)+'/'+parsed.getDate()+' '+('0'+parsed.getHours()).substr(-2,2)+':'+('0'+parsed.getMinutes()).substr(-2,2);
  }
});

Template.chatworksMessage.events({
  'click': function() {
    if(Session.get('autoscroll')) {
      Session.set('autoscroll', undefined);
    } else {
      Session.set('autoscroll', true);
    }
  },
  'click span.handle': function() {
    $('.hilite').removeClass('hilite');
    if(Session.get('handleFind') !== this.handle) {
      $('span:contains('+this.handle+')').parent().addClass('hilite');
      Session.set('handleFind', this.handle);
    } else {
      Session.set('handleFind', undefined);
    }
  }
});

Template.chatworksMessage.rendered = function() {
  $(this.find('.message')).children('.handle').css('color', colorHandle(this.data.handle));
  $(this.find('.message')).addClass('chatworks-boom');
  if(Session.get('autoscroll')) {
    $('#chatworks-messages').scrollTop(99999);
  }
};

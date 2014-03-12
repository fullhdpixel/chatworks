Template.chatworksMessage.helpers({
  prettyTime: function() {
    if(!this["ts"]) return "";
    var val = this["ts"];
    var parsed = new Date(val);
    return '['+(parsed.getMonth()+1)+'/'+parsed.getDate()+']'+('0'+parsed.getHours()).substr(-2,2)+':'+('0'+parsed.getMinutes()).substr(-2,2);
  }
});

Template.chatworksMessage.events = {
  'click': function() {
    autoScroll = false;
  }
};


Template.chatworksMessage.rendered = function() {
  scrollToBottom();
  $(this.find('.message')).hide().fadeIn();
};

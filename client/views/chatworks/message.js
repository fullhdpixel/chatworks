Template.message.helpers({
  //todo refactor
  linkify: function() {
    //something went horribly wrong here
    if(!this["message"]) return "";
    if(typeof this["message"] !== 'string') {
      return "";
    } else {
      var val = this["message"];
    }
    var link = Handlebars._escape(val);
    var exp = /((http|https):\/\/([ \S]+\.(jpg|jpeg|png|gif)))/ig;
    if(val.match(exp)) {
      link = val.replace(exp, '<a href="$1" target="_blank"><img src="$1" width="200" height="200"></a>');
    } else {
      exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      link = val.replace(exp, '<a href="$1" target="_blank">$1</a>');
    }
    return link;
  },
  prettyTime: function() {
    if(!this["ts"]) return "";
    var val = this["ts"];
    var parsed = new Date(val);
    return '['+(parsed.getMonth()+1)+'/'+parsed.getDate()+']'+('0'+parsed.getHours()).substr(-2,2)+':'+('0'+parsed.getMinutes()).substr(-2,2);
  }
});

Template.message.events = {
  'click': function(evt) {
    autoScroll = false;
  }
};


Template.message.rendered = function() {
  scrollToBottom();
  $(this.find('.message')).hide().fadeIn();
};

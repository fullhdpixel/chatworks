Template.messageItem.helpers({
  linkify: function() {
    //something horribly wrong here
    if(!this["message"]) return "";
    if(typeof this["message"] !== 'string') {
      var val = this["message"].join(' ');
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
    if(!this["date_time"]) return "";
    var val = this["date_time"];
    var parsed = new Date(val);
    return ('0'+parsed.getHours()).substr(-2,2)+':'+('0'+parsed.getMinutes()).substr(-2,2);
  },
  frequency: function() {
    //todo fix bug that animates all lines upon new message for [handle]
//    if(!this["handle"]) return "";
//    var freq = Messages.find({handle: this["handle"]});
//    return freq.count();
  }
});

Template.messageItem.rendered = function() {
  $(this.find('div.message')).hide().fadeIn();
  scrollToBottom();
};
Meteor.startup(function () {
  var pingTimer = 10000;
  // every ping, remove inactive users from online list
  Meteor.setInterval(function() {
    var chatworksNow = new Date;
    // remove users that haven't replied in a minute
    chatworksNow.setMinutes(chatworksNow.getMinutes() - 1);
    ChatworksUsers.remove({last_seen: {$lt: +chatworksNow}});
  }, pingTimer);
});

Meteor.methods({
  addMessage: function(room, message) {
    this.unblock();
    var maxMessageLength = 400;
    var handle = handleGenerator();
    if(this.userId) {
      var hasHandle = ChatworksUsers.findOne({userId: this.userId}).handle;
      if(hasHandle) {
        handle = hasHandle;
      }
    }
    // message length control
    message = message.substring(0, maxMessageLength);
    // finally add the message
    ChatworksMessages.insert({
      handle: handle,
      room: room,
      message: message,
      ts: +new Date()
    });
  },
  onlineCheck: function() {
    var now = +new Date;
    if(!this.userId) {
      this.setUserId(Random.id());
      var handle = handleGenerator();
      ChatworksUsers.upsert({userId: this.userId},{$set: {handle: handle, last_seen: now}});
    }
    this.unblock();
    var hasHandle = ChatworksUsers.findOne({userId: this.userId}).handle;
    if(!hasHandle) {
      if(typeof Meteor.user() !== 'undefined' && typeof Meteor.user().username !== 'undefined') {
        ChatworksUsers.upsert({userId: this.userId},{$set: {handle: Meteor.user().username, last_seen: now}});
      } else {
        ChatworksUsers.upsert({userId: this.userId},{$set: {handle: handleGenerator(), last_seen: now}});
      }
    } else {
      ChatworksUsers.upsert({userId: this.userId},{$set: {last_seen: now}});
    }
  }
});

function handleGenerator() {
  return (Math.floor(Math.random() * 9000)+'Anon');
}
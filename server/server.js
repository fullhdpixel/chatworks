Meteor.startup(function () {
  var pingTimer = 10000;
  // every ping, remove inactive users from online list
  Meteor.setInterval(function() {
    var minuteAgo = new Date;
    // remove users that haven't replied in a minute
    minuteAgo.setMinutes(minuteAgo.getMinutes() - 1);
    ChatworksUsers.remove({last_seen: {$lt: +minuteAgo}});
  }, pingTimer);
});

Meteor.methods({
  addMessage: function(room, message) {
    this.unblock();
    var maxMessageLength = 400;
    // todo race conditions
    var isUser = ChatworksUsers.findOne({userId: this.userId});
    var handle = '';
    if(Meteor.users && Meteor.user() && Meteor.user().username) {
      handle = Meteor.user().username;
    }
    if(isUser) {
      handle = isUser.handle;
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
    //set a userId if unavailable
    if(!this.userId) {
      this.setUserId(Random.id());
    }
    this.unblock();
    var isUser = ChatworksUsers.findOne({userId: this.userId});
    //if user but no handle
    var now = +new Date;
    if(typeof isUser != 'undefined' && typeof isUser.handle != 'undefined') {
      ChatworksUsers.upsert({userId: this.userId},{$set:{last_seen: now}});
    } else {
      if(Meteor.users && Meteor.user() && Meteor.user().username) {
        //if accounts enabled, and is a real account with a username, set the ChatworksUser handle to username
        ChatworksUsers.upsert({userId: this.userId},{$set:{handle: Meteor.user().username, registered: true, last_seen: now}});
      } else {
        //if no user, set a random handle
        var handle = (Math.floor(Math.random() * 9000)+'Anon');
        ChatworksUsers.upsert({userId: this.userId},{$set:{handle: handle, registered: false, last_seen: now}});
      }
    }
  }
});

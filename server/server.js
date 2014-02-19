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
		//client ain't got time for a callback
    this.unblock();
    var maxMessageLength = 400,
    	isUser = ChatworksUsers.findOne({userId: this.userId}),
    	now = new Date,
    	secondsAgo = new Date,
		  handle = haiku();
    secondsAgo.setSeconds(now.getSeconds() - 1);
		//user has registered an account
    if(Meteor.users && Meteor.user() && Meteor.user().username) {
      handle = Meteor.user().username;
    }
		//user already has a session (and generated userId)
    if(isUser) {
      handle = isUser.handle;
    }
		//user has not already sent a message within x seconds
    var flood = ChatworksMessages.findOne({userId: this.userId, ts: {$gt: +secondsAgo }});
    if(!flood) {
      // message length control
      message = message.substring(0, maxMessageLength);
      // finally add the message
      ChatworksMessages.insert({
        userId: this.userId,
        handle: handle,
        room: room,
        message: message,
        ts: +now
      });
    }
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
        var handle = haiku();

        ChatworksUsers.upsert({userId: this.userId},{$set:{handle: handle, registered: false, last_seen: now}});
      }
    }
  }
});


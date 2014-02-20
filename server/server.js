var maxMessageLength = 400; //todo: some config file

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

Meteor.onConnection(function(connection) {
  //stub for future use
});

Meteor.methods({
  addMessage: function(room, message) {
    //client ain't got time for a callback
    this.unblock();
    var isUser = ChatworksUsers.findOne({userId: this.userId}),
      now = new Date,
      secondsAgo = new Date,
      handle = haiku(),
      ip = '0.0.0.0';
    secondsAgo.setSeconds(now.getSeconds() - 1);
    //user has registered an account
    if(Meteor.users && Meteor.user() && Meteor.user().username) {
      handle = Meteor.user().username;
    }
    //user already has a session (and generated userId)
    if(isUser) {
      handle = isUser.handle;
      ip = isUser.ip;
    }
    //user has not already sent a message within x seconds
    var flood = ChatworksMessages.findOne({ip: ip, ts: {$gt: +secondsAgo }});
    if(!flood) {
      // message length control
      message = message.substring(0, maxMessageLength);
      // finally add the message
      ChatworksMessages.insert({
        userId: this.userId,
        ip: ip,
        handle: handle,
        room: room,
        message: message,
        ts: +now
      });
    }
  },
  onlineCheck: function() {
    if(!this.userId) {
      this.setUserId(Random.id());
    }
    this.unblock();
    var ip = headers.methodClientIP(this);
    if(ip === '127.0.0.1') {
      var header = headers.methodGet(this);
      var ln = header['x-ip-chain'].length-2;
      ip = header['x-ip-chain'][ln];
    }
    var isUser = ChatworksUsers.findOne({ip: ip});
    var now = +new Date;
    //set a userId if unavailable
    if(Meteor.users && Meteor.user() && Meteor.user().username) {
      //if accounts enabled, and is a real account with a username, set the ChatworksUser handle to username
      ChatworksUsers.upsert({ip: ip},{$set:{userId: this.userId, handle: Meteor.user().username, registered: true, last_seen: now}});
      return ip;
    }
    //if user but no handle
    if(isUser && isUser.handle) {
      ChatworksUsers.upsert({ip: ip},{$set:{userId: this.userId, last_seen: now}});
    } else {
      //set a random handle
      var handle = haiku();
      ChatworksUsers.upsert({ip: ip},{$set:{handle: handle, registered: false, last_seen: now}});
    }
    return ip;
  }
});


var maxMessageLength = 400;

Meteor.onConnection(function(connection) {
  var user = ChatworksUsers.findOne({ip: connection.clientAddress});
  if(user) {
    //keep same handle
    ChatworksUsers.upsert({ip: connection.clientAddress},{$set:{lastSeen: +new Date}});
  } else {
    //assign new handle
    ChatworksUsers.upsert({ip: connection.clientAddress},{$set:{handle: haiku(), lastSeen: +new Date}});
  }
});

Meteor.methods({
  addMessage: function(room, message) {
    check(room, String);
    check(message, String);
    var user = ChatworksUsers.findOne({ip: this.connection.clientAddress}),
      handle = user.handle;
    //user has registered an account, use this handle instead
    //update lastSeen
    if(Meteor.users && Meteor.user() && Meteor.user().username) {
      handle = Meteor.user().username;
      ChatworksUsers.upsert({ip: this.connection.clientAddress},{$set:{handle: handle, lastSeen: +new Date}});
    } else {
      ChatworksUsers.upsert({ip: this.connection.clientAddress},{$set:{lastSeen: +new Date}});
    }
    //user has not already sent a message within x seconds
      // message length control
      message = message.substring(0, maxMessageLength);
      // finally add the message
      ChatworksMessages.insert({
        userId: this.userId,
        ip: this.connection.clientAddress,
        handle: handle,
        room: room,
        message: message,
        ts: +new Date
      });
  }
});


//todo: flood control


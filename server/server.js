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
    var user = ChatworksUsers.findOne({ip: this.connection.clientAddress});
    var handle = user.handle;
    //update lastSeen
    ChatworksUsers.upsert({ip: this.connection.clientAddress},{$set:{lastSeen: +new Date}});
    //user has not already sent a message within x seconds
    // message length control
    message = message.substring(0, maxMessageLength);
    // insert the message
    ChatworksMessages.insert({
      userId: this.userId,
      ip: this.connection.clientAddress,
      handle: handle,
      room: room,
      message: message,
      ts: +new Date
    });
  },
  createRoom: function(room) {
    check(room, String);
    var user = ChatworksUsers.findOne({ip: this.connection.clientAddress});
    //only one room allowed per user
    if(ChatworksRooms.find({owner: user._id}).count() > 0) {
      throw new Meteor.Error(418, 'Only one room allowed per user');
    }
    return ChatworksRooms.insert({
      name: room,
      owner: user._id
    });
  }
});

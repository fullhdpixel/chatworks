Messages = new Meteor.Collection('messages');
Rooms = new Meteor.Collection('rooms');

Meteor.methods({
  add_message: function (message) {
    if(Rooms.find({room_id: message.room_id}).count() === 0) {
      Rooms.insert({
        room_id: message.room_id,
        topic: "topic here",
        date_time: new Date()
      });
    }
    Messages.insert({
      handle: message.handle,
      room_id: message.room_id,
      message: message.message,
      date_time: new Date(),
      color: message.color,
      action: false,
      irc: false,
      bot: false,
      confirmed: !this.isSimulation
    });
  },
  add_room: function (room_id) {
    if(Rooms.find({room_id: room_id}).count() === 0) {
      Rooms.insert({
        room_id: room_id,
        topic: "topic here",
        date_time: new Date()
      });
    }
  },
  online: function() {
    if(!this.userId) return false;
    Meteor.users.update(this.userId(), {
      $set: {
        'profile.online': true
      }
    });
  }
});

Messages.deny({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});

Rooms.deny({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});
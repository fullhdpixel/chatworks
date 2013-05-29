Messages = new Meteor.Collection('messages');
Rooms = new Meteor.Collection('rooms');

Meteor.methods({
  add_message: function (message) {
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
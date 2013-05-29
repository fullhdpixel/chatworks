Messages = new Meteor.Collection('messages');
Rooms = new Meteor.Collection('rooms');

Meteor.methods({
  add_message: function (handle, room_id, textbox, hue) {
    Messages.insert({
      handle: handle,
      room_id: room_id,
      message: textbox,
      date_time: new Date(),
      color: hue,
      action: false,
      irc: false,
      bot: false,
      confirmed: !this.isSimulation
    });
  }
});
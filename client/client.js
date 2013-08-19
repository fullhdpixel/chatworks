Meteor.methods({
  addMessage: function (message) {
    Messages.insert({
      handle: message.handle,
      room_id: message.room_id,
      message: message.message,
      date_time: new Date(),
      action: false,
      irc: false,
      bot: false,
      confirmed: !this.isSimulation
    });
  },
  addNoun: function(noun) {
    Nouns.insert({
      value: noun,
      date_time: new Date(),
      confirmed: !this.isSimulation
    });
  }
});
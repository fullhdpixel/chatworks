Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Session.setDefault('auto_scroll', true);
Session.setDefault('show_stats', false);
Session.setDefault('limit', 10);
Session.setDefault('analyze_limit', 1000);
Session.setDefault('room_id', '#bots');
Session.setDefault('sub_name', 'messages');
Session.setDefault('links_limit', '10');
Session.setDefault('images_only', true);

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
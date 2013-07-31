Meteor.startup(function () {
  //todo: setup collections?
  //grab messages db size
  //todo: autorun?
  BOUNDRY_COUNT = Messages.find().count()-1;
  config = {};
  //watch configs collection and put them into local object for ease of access
  var configs = Configs.find({confirmed: true});
  configs.observe({
    added: function(document) {
      config[document.name] = document.value;
    },
    changed: function(document, olddocument) {
      config[document.name] = document.value;
    }
  });
  //set admin status's to false on startup
  Meteor.call('addConfig', 'webMonitor', false);
  Meteor.call('addConfig', 'ircMonitor', false);
  Meteor.call('addConfig', 'ircConnecting', false);
  Meteor.call('addConfig', 'spamMonitor', false);
  Meteor.call('addConfig', 'commandMonitor', false);
  Meteor.call('addConfig', 'webToIrc', false);
  Rooms.update({status: true},{$set: {status: false}});
});

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
    var isDupe = Nouns.findOne({value: noun});
    if(typeof isDupe === 'undefined') {
      Nouns.insert({
        value: noun,
        date_time: new Date(),
        confirmed: !this.isSimulation
      });
    }
  }
});
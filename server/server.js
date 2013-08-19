Meteor.startup(function () {
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
  privateAddConfig('webMonitor', false);
  privateAddConfig('ircMonitor', false);
  privateAddConfig('ircConnecting', false);
  privateAddConfig('spamMonitor', false);
  privateAddConfig('commandMonitor', false);
  privateAddConfig('webToIrc', false);
  Meteor.call('startCommand');
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
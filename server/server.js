Meteor.startup(function () {
  config = {};
  //watch configs collection and put them into a local object for speed of access
  var configs = Configs.find({confirmed: true});
  configs.observe({
    added: function(document) {
      config[document.name] = document.value;
    },
    changed: function(document, olddocument) {
      config[document.name] = document.value;
    }
  });
  //set defaults
  Rooms.update({status: true}, {$set: {status: false}});
  _addConfig('webMonitor', false);
  _addConfig('ircMonitor', false);
  _addConfig('ircConnecting', false);
  _addConfig('spamMonitor', false);
  _addConfig('commandMonitor', false);
  _addConfig('webToIrc', false);
  _startCommand();
  _startIrc();
});


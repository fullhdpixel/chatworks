_startSpam = function() {
  _addConfig('spamMonitor', true);
  spam = Meteor.setInterval(function() {
    var BOUNDRY_COUNT = Messages.find().count()-1;
    var msg = Messages.findOne({}, {skip: Math.floor(Math.random() * BOUNDRY_COUNT)});
    if(msg.message) {
      Bot.say(msg.room_id, msg.message);
    }
  }, (Math.floor(Math.random() * (60 * 1)))*1000);
}
_stopSpam = function() {
  _addConfig('spamMonitor', false);
  Meteor.clearTimeout(spam);
}
_startCommand = function() {
  _addConfig('commandMonitor', true);
  var webchat = Messages.find({action: false, irc: false, bot: false, 'date_time': {$gte: new Date()}});
  commandMonitor = webchat.observeChanges({
    added: function(id, document) {
      //AI response to webchat
      processMessage(document.handle, document.room_id, document.message);
      //echo webchat to irc
      if(config.ircMonitor && config.webToIrc) {
        if(document.handle === 'anonymous') {
          if(document.message.lastIndexOf('/me', 0) === 0) {
            Bot.webAction(document.room_id, document.message.slice(3));
          } else {
            Bot.webSay(document.room_id, document.message);
          }
        } else {
          if(document.message.lastIndexOf('/me', 0) === 0) {
            Bot.webAction(document.room_id, '@' + document.handle + ' ' + document.message.slice(3));
          } else {
            Bot.webSay(document.room_id, '@' + document.handle + ': ' + document.message);
          }
        }
      }
    }
  });
}
_stopCommand = function() {
  _addConfig('commandMonitor', false);
  commandMonitor.stop();
}

//public methods
Meteor.methods({
  startSpam: function() {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    _startSpam();
  },
  stopSpam: function() {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    _stopSpam();
  },
  startCommand: function() {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    _startCommand();
  },
  stopCommand: function() {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    _stopCommand();
  }
});

//private methods
Bot = {
  say: function(to, str) {
    //insert bot response into db
    if(str === '') {
      str = fourohfour.random();
    }
    if(config.ircMonitor) {
      client.say(to, str);
    }
    Messages.insert({
      handle: config.botName,
      room_id: to,
      message: str,
      date_time: new Date(),
      action: false,
      irc: false,
      bot: true
    });
  },
  action: function(to, str) {
    if(config.ircMonitor) {
      client.action(to, str);
    }
    Messages.insert({
      handle: config.botName,
      room_id: to,
      message: str,
      date_time: new Date(),
      action: true,
      irc: false,
      bot: true
    });
  },
  webSay: function(to, str) {
    if(str === '') {
      str = fourohfour.random();
    }
    if(config.ircMonitor) {
      client.say(to, str);
    }
  },
  webAction: function(to, str) {
    if(config.ircMonitor) {
      client.action(to, str);
    }
  }
};
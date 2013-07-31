//public methods
Meteor.methods({
  startSpam: function() {
    Meteor.call('addConfig', 'spamMonitor', true);
    spam = Meteor.setInterval(function() {
      var msg = Messages.findOne({}, {skip: Math.floor(Math.random() * BOUNDRY_COUNT)});
      if(msg.message) {
        Bot.say(msg.room_id, msg.message);
      }
    }, (Math.floor(Math.random() * (60 * 1)))*1000);
  },
  stopSpam: function() {
    Meteor.call('addConfig', 'spamMonitor', false);
    Meteor.clearTimeout(spam);
  },
  startCommand: function() {
    Meteor.call('addConfig', 'commandMonitor', true);
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
              Bot.webSay(document.room_id, '@' + document.handle + ': ' + document.message.slice(3));
            }
          }
        }
      }
    });
  },
  stopCommand: function() {
    Meteor.call('addConfig', 'commandMonitor', false);
    commandMonitor.stop();
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
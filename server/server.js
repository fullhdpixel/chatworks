Fiber = Npm.require("fibers");
Meteor.startup(function () {
  //grab messages db size
  BOUNTY_COUNT = Messages.find().count()-1;

  //only publish messages since 7 hours ago
  var now = new Date();
  var millisecondsIn7Hours = 7 * 60 * 60 * 1000;
  var sevenHoursAgo = new Date(now - millisecondsIn7Hours);

  Messages.allow({
    insert: function(userId, doc) {
      return true;
    }
  });

  //todo: display users logged into web

  //IRC Bot functions
  if(config.monitorIrc) {
    //make irc connection
    client.connect();
    //keep-alive
    setInterval(function() { client.send('PONG', 'empty'); }, 3*60*1000 );

    //on every message, insert into database
    client.addListener('message', function(from, to, message) {
      var newTime = new Date();

      Fiber(function() {
        var processedMessage = processMessage(message); //meteor.call throws error
        var str = getResponse(processedMessage);

        //insert irc message into db
        Messages.insert({
          handle: from,
          room_id: config.webChannel,
          message: message,
          date_time: newTime,
          color: colorHandle(from),
          action: false,
          irc: true,
          bot: false
        });
        //insert bot response into db
        if(str !== '') {
          client.say(config.ircChannel, str);
          Messages.insert({
            handle: config.botName,
            room_id: config.webChannel,
            message: str,
            date_time: newTime,
            color: colorHandle(config.botName),
            action: false,
            irc: false,
            bot: true
          });
        }
      }).run();
    });
    //on every action, insert into database
    client.addListener('action', function(from, to, message) {
      var newTime = new Date();

      Fiber(function() {
        var processedMessage = processMessage(message);
        var str = getResponse(processedMessage);

        //insert irc action into db
        Messages.insert({
          handle: from,
          room_id: config.webChannel,
          message: message,
          date_time: newTime,
          color: colorHandle(from),
          action: true,
          irc: true,
          bot: false
        });
        //insert bot response into db //todo: make an action response
        if(str !== '') {
          client.say(config.ircChannel, str);
          Messages.insert({
            handle: config.botName,
            room_id: config.webChannel,
            message: str,
            date_time: newTime,
            color: colorHandle(config.botName),
            action: true,
            irc: false,
            bot: true
          });
        }
      }).run();
    });
  } //end BOT


  //monitor webchat
  var webchat = Messages.find({room_id: config.webChannel, action: false, irc: false, bot: false, 'date_time': {$gte: now}});
  webchat.observeChanges({
    added: function(id,document) {
      //AI response to webchat
      var newTime = new Date();
      var processedMessage = processMessage(document.message);
      var str = getResponse(processedMessage);
      if(str !== '') {
        Messages.insert({
          handle: config.botName,
          room_id: config.webChannel,
          message: str,
          date_time: newTime,
          color: colorHandle(config.botName),
          action: false,
          irc: false,
          bot: true
        });
      }
      //echo webchat to irc
      if(config.monitorIrc && config.webToIrc) {
        if(document.handle === 'anonymous') {
          client.say(config.ircChannel, document.message);
        } else {
          client.say(config.ircChannel, '@' + document.handle + ': ' + document.message);
        }
      }
    }
  });

  Meteor.publish('messages', function() {
   return Messages.find({'date_time': {$gte: sevenHoursAgo}});
  });

});

Meteor.Router.add('/admin', 'POST', function(data) {
  //stub
});
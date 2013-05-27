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
      Fiber(function() {
        //insert irc message into db
        Messages.insert({
          handle: from,
          room_id: config.webChannel,
          message: message,
          date_time: new Date(),
          color: colorHandle(from),
          action: false,
          irc: true,
          bot: false
        });
        //generate bot response
        processMessage(message);
      }).run();
    });
    //on every action, insert into database
    client.addListener('action', function(from, to, message) {
      Fiber(function() {
        //insert irc action into db
        Messages.insert({
          handle: from,
          room_id: config.webChannel,
          message: message,
          date_time: new Date(),
          color: colorHandle(from),
          action: true,
          irc: true,
          bot: false
        });
        //generate bot response
        processMessage(message);
      }).run();
    });
  } //end BOT

  //monitor webchat
  var webchat = Messages.find({room_id: config.webChannel, action: false, irc: false, bot: false, 'date_time': {$gte: now}});
  webchat.observeChanges({
    added: function(id,document) {
      //AI response to webchat
      processMessage(document.message);
      //echo webchat to irc
      if(config.monitorIrc && config.webToIrc) {
        if(document.handle === 'anonymous') {
          Bot.say(document.message);
        } else {
          Bot.say('@' + document.handle + ': ' + document.message);
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
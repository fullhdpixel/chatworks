Meteor.startup(function () {
  //grab messages db size
  BOUNDRY_COUNT = Messages.find().count()-1;

  //IRC Bot functions
  if(config.monitorIrc) {
    //make irc connection
    client.connect();
    //keep-alive

    client.addListener('PING', function() {
      Fiber(function() {
        client.send('PONG', config.ircChannel);
      }).run();
    });

    client.addListener('join', function(channel, name, message) {
      Fiber(function() {
        client.send('NAMES', config.ircChannel);
      }).run();
    });

    client.addListener('part', function(channel, name, reason, message) {
      Fiber(function() {
        client.send('NAMES', config.ircChannel);
      }).run();
    });

    client.addListener('names', function(channel, names) {
      Fiber(function() {
        names = _.keys(names);
        Names.insert({
          room_id: channel,
          names: names,
          date_time: new Date()
        });
      }).run();
    });

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
  var webchat = Messages.find({room_id: config.webChannel, action: false, irc: false, bot: false, 'date_time': {$gte: new Date()}});
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

});

Meteor.Router.add('/admin', 'POST', function(data) {
  //stub
});
Meteor.startup(function () {
  //grab messages db size
  BOUNDRY_COUNT = Messages.find().count()-1;

  //todo: testing
  //todo: fix bug where this stacks on meteor restart (code based refresh)
  //when you spam a lot of inserts this spins up more and more server nodes it seems?
  var testid;
  if(testid !== undefined) Meteor.clearInterval(testid);
  if(config.debug) {
    testid = Meteor.setInterval(function() {
      var msg = Messages.findOne({}, {skip: Math.floor(Math.random() * BOUNDRY_COUNT)});
      if(msg.message) {
        Bot.say(msg.message);
      }
    }, (Math.floor(Math.random() * (60 * 5)))*1000);
  }

  //IRC Bot functions
  if(config.monitorIrc) {
    //make irc connection
    //todo check if connected, else, reconnect
    Fiber(function() {
      client.connect(2, function() {

      });
    }).run();

    //keep-alive
    client.addListener('PING', function() {
      Fiber(function() {
        client.send('PONG', config.ircChannel);
      }).run();
    });

    //get number of users on irc channel
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
    client.addListener('message', function(handle, to, message) {
      Fiber(function() {
        //insert irc message into db
        Messages.insert({
          handle: handle,
          room_id: config.webChannel,
          message: message,
          date_time: new Date(),
          color: colorHandle(handle),
          action: false,
          irc: true,
          bot: false
        });
        //generate bot response
        processMessage(handle, message);
      }).run();
    });
    //on every action, insert into database
    client.addListener('action', function(handle, to, message) {
      Fiber(function() {
        //insert irc action into db
        Messages.insert({
          handle: handle,
          room_id: config.webChannel,
          message: message,
          date_time: new Date(),
          color: colorHandle(handle),
          action: true,
          irc: true,
          bot: false
        });
        //generate bot response
        processMessage(handle, message);
      }).run();
    });
  } //end BOT

  //monitor webchat
  var webchat = Messages.find({room_id: config.webChannel, action: false, irc: false, bot: false, 'date_time': {$gte: new Date()}});
  webchat.observeChanges({
    added: function(id, document) {
      //AI response to webchat
      processMessage(document.handle, document.message);
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
Meteor.methods({
  startIrc: function() {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    privateAddConfig('ircConnecting', true);
    if(typeof client !== 'undefined') {
      client.disconnect();
    }
    //irc connection setup
    var serverhere = config.ircServer;
    if(ENVIRONMENT === 'development') {
      serverhere = config.devServer;
    }
    client = new IRC.Client(serverhere, config.botName, {
      userName: config.botName,
      realName: config.botName + ' Watson',
      debug: false,
      showErrors: false,
      autoRejoin: true,
      autoConnect: false,
      secure: false,
      selfSigned: false,
      certExpired: false,
      floodProtection: true,
      floodProtectionDelay: 1500,
      stripColors: true,
      messageSplit: 400
    });
    //make irc connection
    //todo check if connected, else, reconnect
    //todo: investigate setInterval vs setImmediate
    client.connect(function() {
      Fiber(function() {
        privateAddConfig('ircConnecting', false);
        privateAddConfig('ircMonitor', true);
      }).run();
    });

    //keep-alive
    client.addListener('PING', function() {
      client.send('PONG');
    });

    //get number of users on irc channel
    client.addListener('join', function(channel, name, message) {
      client.send('NAMES', channel);
    });

    client.addListener('part', function(channel, name, reason, message) {
      client.send('NAMES', channel);
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
          room_id: to,
          message: message,
          date_time: new Date(),
          action: false,
          irc: true,
          bot: false
        });
        //generate bot response
        processMessage(handle, to, message);
      }).run();
    });
    //on every action, insert into database
    client.addListener('action', function(handle, to, message) {
      Fiber(function() {
        //insert irc action into db
        Messages.insert({
          handle: handle,
          room_id: to,
          message: message,
          date_time: new Date(),
          action: true,
          irc: true,
          bot: false
        });
        //generate bot response
        processMessage(handle, to, message);
      }).run();
    });
  },
  stopIrc: function() {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    privateAddConfig('ircMonitor', false);
    if(typeof client !== 'undefined') {
      client.disconnect();
    }
  },
  listChannels: function() {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if(typeof client !== 'undefined') {
      return client.chans;
    }
    return false;
  },
  joinChannel: function(channel) {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if(channel === '') {
      Alerts.insert({message: 'Please input a real channel', seen: false});
    }
    if(!channel.startsWith('#')) {
      channel = '#'+channel;
    }
    if(typeof client !== 'undefined') {
      client.join(channel);
      var rooms = Rooms.findOne({name: channel});
      if(typeof rooms != 'undefined') {
        Rooms.update({name: channel}, {$set: {status: true}});
      } else {
        Rooms.insert({name: channel, status: true});
      }
    } else {
      Alerts.insert({message: 'Connect to irc before joining a channel', seen: false});
    }
  },
    //todo: crashes node
  partChannel: function(channel) {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if(!channel.startsWith('#')) {
      channel = '#'+channel;
    }
    if(typeof client !== 'undefined') {
      client.part(channel);
      Rooms.update({name: channel}, {$set: {status: false}});
    }
  }
});

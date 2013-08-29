_startIrc = function() {
  _addConfig('ircConnecting', true);
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
    channels: config.ircChannel.split(','),
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
  client.connect(Meteor.bindEnvironment(function() {
      _addConfig('ircConnecting', false);
      _addConfig('ircMonitor', true);
  }, function(e) {
    Meteor._debug("Exception from connection close callback:", e);
  }));

  //keep-alive
  client.addListener('PING', function() {
    client.send('PONG');
  });

  //get number of users on irc channel
  client.addListener('join', Meteor.bindEnvironment(function(channel, name, message) {
    client.send('NAMES', channel);
    if(name === config.botName) {
      var rooms = Rooms.findOne({name: channel});
      if(typeof rooms !== 'undefined') {
        Rooms.update({name: channel}, {$set: {status: true}});
      } else {
        Rooms.insert({name: channel, status: true});
      }
    }
  }, function(e) {
    Meteor._debug("Exception from connection close callback:", e);
  }));

  client.addListener('part', Meteor.bindEnvironment(function(channel, name, reason, message) {
    if(name === config.botName) {
      var rooms = Rooms.findOne({name: channel});
      if(typeof rooms !== 'undefined') {
        Rooms.update({name: channel}, {$set: {status: false}});
      }
    } else {
      client.send('NAMES', channel);
    }
  }, function(e) {
    Meteor._debug("Exception from connection close callback:", e);
  }));

  client.addListener('names', Meteor.bindEnvironment(function(channel, names) {
      names = _.keys(names);
      Names.insert({
        room_id: channel,
        names: names,
        date_time: new Date()
      });
  }, function(e) {
    Meteor._debug("Exception from connection close callback:", e);
  }));

  //on every message, insert into database
  client.addListener('message', Meteor.bindEnvironment(function(handle, to, message) {
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
  }, function(e) {
    Meteor._debug("Exception from connection close callback:", e);
  }));
  //on every action, insert into database
  client.addListener('action', Meteor.bindEnvironment(function(handle, to, message) {
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
  }, function(e) {
    Meteor._debug("Exception from connection close callback:", e);
  }));
}
_stopIrc = function() {
  _addConfig('ircMonitor', false);
  if(typeof client !== 'undefined') {
    client.disconnect();
  }
}
_joinChannel = function(channel) {
  if(channel === '') {
    //error
  }
  if(!channel.startsWith('#')) {
    channel = '#'+channel;
  }
  if(typeof client !== 'undefined') {
    client.join(channel);
  }
}
_partChannel = function(channel) {
  if(channel === '') {
    //error
  }
  if(!channel.startsWith('#')) {
    channel = '#'+channel;
  }
  if(typeof client !== 'undefined') {
    client.part(channel);
  }
}

Meteor.methods({
  startIrc: function() {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    _startIrc();
  },
  stopIrc: function() {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    _stopIrc();
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
    _joinChannel(channel);
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
    _partChannel(channel);
  }
});

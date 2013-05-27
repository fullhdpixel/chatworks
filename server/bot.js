Bot = {
  say: function(str) {
    //insert bot response into db
    if(str !== '') {
      if(config.monitorIrc) {
        client.say(config.ircChannel, str);
      }
      Messages.insert({
        handle: config.botName,
        room_id: config.webChannel,
        message: str,
        date_time: new Date(),
        color: colorHandle(config.botName),
        action: false,
        irc: false,
        bot: true
      });
    }
  },
  action: function(str) {
    if(config.monitorIrc) {
      client.action(config.ircChannel, str);
    }
    Messages.insert({
      handle: config.botName,
      room_id: config.webChannel,
      message: str,
      date_time: new Date(),
      color: colorHandle(config.botName),
      action: true,
      irc: false,
      bot: true
    });
  }
};
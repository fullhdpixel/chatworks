if (Messages.find({room_id: 'bots'}).count() === 0) {
  Messages.insert({
    handle: 'Meteor',
    room_id: 'bots',
    message: 'Hello there!',
    date_time: new Date(),
    color: colorHandle('Meteor'),
    action: false,
    irc: false,
    bot: false,
    confirmed: !this.isSimulation
  });
  Messages.insert({
    handle: config.botName,
    room_id: 'bots',
    message: 'Hi I\'m a bot!',
    date_time: new Date(),
    color: colorHandle(config.botName),
    action: false,
    irc: false,
    bot: false,
    confirmed: !this.isSimulation
  });
  Messages.insert({
    handle: 'Pent',
    room_id: 'bots',
    message: 'Follow me on ADN or github! @pent',
    date_time: new Date(),
    color: colorHandle('Pent'),
    action: false,
    irc: false,
    bot: false,
    confirmed: !this.isSimulation
  });
  Messages.insert({
    handle: config.botName,
    room_id: 'bots',
    message: 'Check the rooms dropdown for your irc channel!',
    date_time: new Date(),
    color: colorHandle(config.botName),
    action: false,
    irc: false,
    bot: false,
    confirmed: !this.isSimulation
  });
}
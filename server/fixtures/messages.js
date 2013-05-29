if (Messages.find().count() === 0) {
  Messages.insert({
    handle: 'Meteor',
    room_id: '',
    message: 'Hello there!',
    date_time: new Date(),
    color: colorHandle('Meteor'),
    action: false,
    irc: false,
    bot: false,
    confirmed: !this.isSimulation
  });
  Messages.insert({
    handle: 'Chatworks',
    room_id: '',
    message: 'Hi I\'m a bot!',
    date_time: new Date(),
    color: colorHandle('Chatworks'),
    action: false,
    irc: false,
    bot: false,
    confirmed: !this.isSimulation
  });
  Messages.insert({
    handle: 'Jon',
    room_id: '',
    message: 'Follow me on twitter! @jonathanpidgeon',
    date_time: new Date(),
    color: colorHandle('Jon'),
    action: false,
    irc: false,
    bot: false,
    confirmed: !this.isSimulation
  });
}
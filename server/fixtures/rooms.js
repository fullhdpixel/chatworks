Rooms.remove({});
if (Rooms.find().count() === 0) {
  Rooms.insert({
    room_id: 'anonymous',
    topic: 'Anonymous Room',
    date_time: new Date()
  });
  Rooms.insert({
    room_id: 'bots',
    topic: 'Autonomous Assemble',
    date_time: new Date()
  });
  Rooms.insert({
    room_id: config.webChannel,
    topic: 'Your Channel',
    date_time: new Date()
  });
  Rooms.insert({
    room_id: '',
    topic: 'Default',
    date_time: new Date()
  });
}
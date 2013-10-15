Meteor.publish('chatworksMessages', function(room, limit) {
  var count = ChatworksMessages.find({room: room}).count();
  var boundary = 0;
  //calculate boundary: the messages that we pull from the end of the collection
  if(count > limit) {
    boundary = count-limit;
  }
  return ChatworksMessages.find({room: room}, {sort: {ts: 1}, skip: boundary});
});

Meteor.publish('chatworksRooms', function() {
  return ChatworksRooms.find();
});

// publish every minute ?
Meteor.publish('chatworksUsers', function() {
  return ChatworksUsers.find({}, {fields: {handle: 1}});
});
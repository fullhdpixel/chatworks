Meteor.publish('messages', function(room_id, limit) {
  var boundary = Messages.find({room_id: room_id}).count()-limit;
 return Messages.find({room_id: room_id}, {sort: {date_time: 1}, skip: boundary});
});

Meteor.publish('rooms', function() {
 return Rooms.find({});
});
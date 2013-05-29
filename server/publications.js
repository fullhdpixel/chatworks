Meteor.publish('messages', function(room_id, limit) {
  var count = Messages.find({room_id: room_id}).count();
  if(count > limit) {
    var boundary = count-limit;
  } else {
    var boundary = 1;
  }
 return Messages.find({room_id: room_id}, {skip: boundary});
});

Meteor.publish('rooms', function() {
 return Rooms.find({});
});
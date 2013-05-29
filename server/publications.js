Meteor.publish('messages', function(room_id) {
 return Messages.find({room_id: room_id});
});

Meteor.publish('someMessages', function(room_id) {
 return Messages.find({}, {skip: BOUNDRY_COUNT-10, sort: {'date_time': 1}});
});

Meteor.publish('allMessages', function() {
 return Messages.find({});
});

Meteor.publish('rooms', function() {
 return Rooms.find({});
});
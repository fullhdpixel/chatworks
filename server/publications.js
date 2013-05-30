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

Meteor.publish('userPresence', function() {
  // Setup some filter to find the users your logged in user
  // cares about. It's unlikely that you want to publish the
  // presences of _all_ the users in the system.
  var filter = {};

  // ProTip: unless you need it, don't send lastSeen down as it'll make your
  // templates constantly re-render (and use bandwidth)
  return Meteor.presences.find(filter, {fields: {state: true, userId: true}});
});
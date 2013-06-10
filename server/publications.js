Meteor.publish('messages', function(room_id, limit) {
  console.log('publishing: ' + room_id + ' ' + limit);
  if(room_id == undefined) {
    room_id = '#1810';
  }
  if(limit == undefined) {
    limit = '1';
  }
  var count = Messages.find({room_id: room_id}).count();
  //calculate boundary, the messages we pull from the end of the collection
  if(count < limit) {
    //collection size is smaller than the limit, skip nothing
    var boundary = 0;
  } else {
    //collection size is
    var boundary = count-limit;
  }
  console.log('skipping: ' + boundary);
  return Messages.find({room_id: room_id}, {sort: {date_time: 1}, skip: boundary});
});

Meteor.publish('rooms', function() {
 return Rooms.find({});
});

Meteor.publish('names', function() {
 return Names.find({});
});

Meteor.publish('stats', function() {
  return Stats.find({});
});

Meteor.publish('urls', function() {
  return Urls.find({});
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
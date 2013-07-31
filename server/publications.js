Meteor.publish('messages', function(room_id, limit) {
  if(this.userId) {
    if(room_id == undefined) {
      room_id = config.webChannel;
    }
    if(limit == undefined) {
      limit = '1';
    }
    var count = Messages.find({room_id: room_id}).count();
    var boundary = 0;
    //calculate boundary, the messages we pull from the end of the collection
    if(count > limit) {
      boundary = count-limit;
    }
    return Messages.find({room_id: room_id}, {sort: {date_time: 1}, skip: boundary});
  }
  //todo: send alert to user
  return false;
});

Meteor.publish(null, function () {
  var user = Meteor.users.findOne(this.userId);
  if(_.isUndefined(user)) { return false; }
  if(user.role == 'admin') {
    return Meteor.users.find({}, {fields: {username: 1, profile: 1, role: 1}});
  }
  return Meteor.users.find({_id: this.userId}, {fields: {username: 1, profile: 1, role: 1}});
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

Meteor.publish('interactions', function() {
  return Interactions.find({});
});

Meteor.publish('urls', function(room_id, limit, query) {
  //todo search the db for the query
  if(this.userId) {
    if(limit == undefined) {
      limit = '1';
    }
    var count = Urls.find({}).count();
    var boundary = 0;
    //calculate boundary, the messages we pull from the end of the collection
    if(count > limit) {
      boundary = count-limit;
    }
    return Urls.find({}, {sort: {date_time: 1}, skip: boundary});
  }
  return false;
});

Meteor.publish('configs', function() {
  var user = Meteor.users.findOne(this.userId);
  if(_.isUndefined(user)) { return false; }
  if(user.role == 'admin') {
    return Configs.find({});
  }
  return false;
});

Meteor.publish('alerts', function() {
  return Alerts.find();
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

Meteor.publish('nouns', function() {
  return Nouns.find();
});
Meteor.publish('messages', function(room_id, limit) {
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
});

Meteor.publish(null, function () {
  return Meteor.users.find({_id: this.userId}, {fields: {username: 1, profile: 1, role: 1}});
});

Meteor.publish('usersRegistered', function() {
  var user = Meteor.users.findOne(this.userId);
  if(_.isUndefined(user)) { return false; }
  if(user.role == 'admin') {
    return Meteor.users.find({}, {fields: {username: 1, profile: 1, role: 1}});
  }
  return false;
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

Meteor.publish('nouns', function() {
  return Nouns.find();
});
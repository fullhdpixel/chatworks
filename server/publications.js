Meteor.publish('messages', function(room, limit) {
  console.log(room+ ' '+ limit);
  if(room == undefined) {
    room = config.webChannel;
  }
  if(limit == undefined) {
    limit = '10';
  }
  var count = Messages.find({room_id: room}).count();
  var boundary = 0;
  //calculate boundary, the messages we pull from the end of the collection
  if(count > limit) {
    boundary = count-limit;
  }
  return Messages.find({room_id: room}, {sort: {date_time: 1}, skip: boundary});
});

Meteor.publish(null, function () {
  return Meteor.users.find({_id: this.userId}, {fields: {username: 1, profile: 1, role: 1}});
});

Meteor.publish('usersRegistered', function() {
  if(_admin) {
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

Meteor.publish('links', function(room, limit) {
  if(room == undefined) {
    room = config.webChannel;
  }
  if(limit == undefined) {
    limit = '10';
  }
  var count = Links.find({room_id: room}).count();
  var boundary = 0;
  //calculate boundary, the messages we pull from the end of the collection
  if(count > limit) {
    boundary = count-limit;
  }
  return Links.find({room_id: room}, {sort: {date_time: 1}, skip: boundary});
});

Meteor.publish('configs', function() {
  var user = Meteor.users.findOne(this.userId);
  if(_.isUndefined(user)) { return false; }
  if(user.role == 'admin') {
    return Configs.find({});
  }
  return false;
});

Meteor.publish('nouns', function() {
  return Nouns.find();
});
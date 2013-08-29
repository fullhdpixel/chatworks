/**
 * Set default user role
 * @return user
 */
Accounts.onCreateUser(function(options, user) {
  //assign default role
  user.role = 'peasant';
  if(options.profile) {
    user.profile = options.profile;
  }
  return user;
});

/**
 * Check for admin privileges
 * @return boolean
 */
Meteor.methods({
  admin: function() {
    return _admin();
  }
});

_admin = function() {
  var user = Meteor.users.findOne(this.userId);
  if(_.isUndefined(user)) { return false; }
  return user.role === 'admin';
};

Messages.allow({
  insert: _admin(),
  update: _admin(),
  remove: _admin()
});

Rooms.allow({
  insert: _admin(),
  update: _admin(),
  remove: _admin()
});

Stats.allow({
  insert: _admin(),
  update: _admin(),
  remove: _admin()
});

Links.allow({
  insert: _admin(),
  update: _admin(),
  remove: _admin()
});

Names.allow({
  insert: _admin(),
  update: _admin(),
  remove: _admin()
});

Configs.allow({
  insert: _admin(),
  update: _admin(),
  remove: _admin()
});

Nouns.allow({
  insert: _admin(),
  update: _admin(),
  remove: _admin()
});
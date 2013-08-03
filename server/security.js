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
    var user = Meteor.users.findOne(this.userId);
    if(_.isUndefined(user)) { return false; }
    return user.role == 'admin';
  },
  clearAlerts: function() {
    Alerts.remove({seen: true});
  }
});

Messages.deny({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});

Rooms.deny({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});

Stats.deny({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});

Urls.deny({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});

Names.deny({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});

Alerts.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});

Alerts.deny({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});

Configs.allow({
  insert: function(userId, doc) {
    return Meteor.call('isAdmin');
  },
  update: function(userId, doc) {
    return Meteor.call('isAdmin');
  },
  remove: function(userId, doc) {
    return Meteor.call('isAdmin');
  }
});

Configs.deny({
  insert: function(userId, doc) {
    return !Meteor.call('isAdmin');
  },
  update: function(userId, doc) {
    return !Meteor.call('isAdmin');
  },
  remove: function(userId, doc) {
    return !Meteor.call('isAdmin');
  }
});

Nouns.deny({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});
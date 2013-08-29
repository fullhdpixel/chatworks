messagesHandle = subscribeWithPagination('messages', Session.get('room'), Session.get('limit'));
linksHandle = subscribeWithPagination('links', Session.get('room'), Session.get('limit'));

Deps.autorun(function() {
  configsHandle = Meteor.subscribe('configs', Session.get('admin'));
});

Deps.autorun(function() {
  if(Meteor.user()) {
    if(Meteor.user().role === 'admin') {
      Session.set('admin', true);
    } else {
      Session.set('admin', false);
    }
  } else {
    Session.set('admin', false);
  }
});

usersHandle = Meteor.subscribe('usersRegistered');
Meteor.subscribe('rooms');
Meteor.subscribe('names');
Meteor.subscribe('stats');
nounsHandle = Meteor.subscribe('nouns');
interactionsHandle = Meteor.subscribe('interactions');
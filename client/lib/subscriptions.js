messagesHandle = subscribeWithPagination('messages', Session.get('room'), 10);
urlsHandle = subscribeWithPagination('urls', Session.get('room'), 10);

Deps.autorun(function() {
  configsHandle = Meteor.subscribe('configs');
});

Deps.autorun(function() {
  if(Meteor.user()) {
    if(Meteor.user().role == 'admin') {
      Session.set('admin', true);
    } else {
      Session.set('admin', false);
    }
  } else {
    Session.set('admin', false);
  }
});

Meteor.subscribe('rooms');
Meteor.subscribe('names');
Meteor.subscribe('stats');
Meteor.subscribe('alerts');
nounsHandle = Meteor.subscribe('nouns');
interactionsHandle = Meteor.subscribe('interactions');
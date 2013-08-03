messagesHandle = Meteor.subscribeWithPagination('messages'); //todo: still bugs with limits and rooms
urlsHandle = Meteor.subscribeWithPagination('urls');

Deps.autorun(function() {
  presenceHandle = Meteor.subscribe('userPresence');
});

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
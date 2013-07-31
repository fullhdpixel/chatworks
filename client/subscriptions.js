messagesHandle = Meteor.subscribeWithPagination('messages');
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
chartData = Stats.find({timestamp: {$gte: new Date().lastHours(1)}}).fetch();
nounsHandle = Meteor.subscribe('nouns');
interactionsHandle = Meteor.subscribe('interactions');
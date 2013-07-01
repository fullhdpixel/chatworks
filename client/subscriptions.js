messagesHandle = Meteor.subscribeWithPagination('messages');
urlsHandle = Meteor.subscribeWithPagination('urls');

Deps.autorun(function() {
  Meteor.subscribe('userPresence');
});

Meteor.subscribe('rooms');
Meteor.subscribe('names');
Meteor.subscribe('stats', function() {});
chartData = Stats.find({timestamp: {$gte: new Date().lastHours(1)}}).fetch();

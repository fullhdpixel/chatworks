  messagesHandle = Meteor.subscribeWithPagination('messages');

  Deps.autorun(function() {
    Meteor.subscribe('userPresence');
  });

  Meteor.subscribe('rooms');
  Meteor.subscribe('names');
  Meteor.subscribe('stats', function() {});
  Meteor.subscribe('urls');
  chartData = Stats.find({timestamp: {$gte: new Date().lastHours(1)}}).fetch();

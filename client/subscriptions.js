Session.setDefault('room_id', 'bots');

//subscribeWithPagination: last parameter is always the limit
messagesHandle = Meteor.subscribeWithPagination('messages', Session.get('room_id'), 10);

Deps.autorun(function() {
  Meteor.subscribe('userPresence');
});

Meteor.subscribe('rooms');
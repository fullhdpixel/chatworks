Session.setDefault('room_id', 'bots');

//subscribeWithPagination: last parameter is always the limit
//messagesHandle = Meteor.subscribeWithPagination('roomMessages', Session.get('room_id'), 20);

Deps.autorun(function() {
  Meteor.subscribe('userPresence');
});

Meteor.subscribe('rooms');
Meteor.subscribe('names');
allMessagesHandle = Meteor.subscribeWithPagination('allMessages', 1);
newMessagesHandle = Meteor.subscribeWithPagination('newMessages', 20);
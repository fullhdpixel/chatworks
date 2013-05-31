Session.setDefault('room_id', 'bots');

//Meteor.subscribe('messages', function onComplete() {
//  Session.set('messagesLoaded', true);
//});
messagesHandle = Meteor.subscribeWithPagination('messages', 10);

Deps.autorun(function() {
  Meteor.subscribe('userPresence');
});

Meteor.subscribe('rooms');
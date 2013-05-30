Session.setDefault('room_id', 'bots');
Session.setDefault('limit', 10);

Deps.autorun(function() {
  Meteor.subscribe('messages', Session.get('room_id'), Session.get('limit'), function onComplete() {
    Session.set('messagesLoaded', true);
  });
  Meteor.subscribe('userPresence');
});
Meteor.subscribe('rooms');

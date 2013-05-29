Session.setDefault('room_id', 'anonymous');

Deps.autorun(function() {
  Meteor.subscribe('messages', Session.get('room_id'), function onComplete() {
    Session.set('messagesLoaded', true);
  });
  Meteor.subscribe('rooms');
});

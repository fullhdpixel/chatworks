Template.chatworksRooms.helpers({
  rooms: function() {
    return ChatworksRooms.find().fetch();
  }
});

Template.chatworksRooms.events({
  'click button': function() {
    if(Session.get('overlay')) {
      Session.set('overlay', undefined);
    } else {
      Session.set('overlay', 'room');
    }
  }
});
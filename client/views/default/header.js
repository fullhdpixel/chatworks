Template.header.helpers({
  currentRoom: function() {
    return Session.get('room_id');
  },
  location: function() {
    return Session.get('lat') + " : " + Session.get('lon');
  },
  currentUser: function () {
    return Meteor.currentUser();
  }
});
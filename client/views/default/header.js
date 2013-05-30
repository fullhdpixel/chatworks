Template.header.helpers({
  currentRoom: function() {
    return Session.get('room_id');
  },
  location: function() {
    return Session.get('lat') + " : " + Session.get('lon');
  },
  currentUser: function () {
    return Meteor.currentUser();
  },
  online: function() {
    return Meteor.presences.find({}).count();
  }
});
Template.header.events = {
  'click button, keyup input': function(evt) {
    // if we tapped the button or hit enter
    if (evt.type === 'click' || (evt.type === 'keyup' && evt.which === 13)) {
      // trim textbox
      var room_id = $('#room').val().substring(0,32);

      Meteor.call('add_room', room_id, function(error, id) {
        if(error) {
          throwError("error: "+error.reason);
        }
      });
    }
  }
};
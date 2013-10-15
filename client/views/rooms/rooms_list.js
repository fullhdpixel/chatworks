Template.roomsList.helpers({
  allRooms: function() {
    return ChatworksRooms.find();
  }
});

Template.roomsList.events({
  'click .rooms': function(event) {
    event.preventDefault();
    $('.dropdown-toggle').dropdown();
  }
});
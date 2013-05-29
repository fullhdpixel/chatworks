Template.roomsList.helpers({
  allRooms: function() {
    return Rooms.find({});
  }
});
Template.channels.helpers({
  channels: function() {
    return Rooms.find();
  }
});

Template.channels.events({
  //generic call meteor server method, name of method is based on button id
  'click button': function(event, template) {
    event.preventDefault();
    var cid = $(event.currentTarget).attr('id');
    var cname = $('#cname').val();
    Meteor.call(cid, cname);
  }
});
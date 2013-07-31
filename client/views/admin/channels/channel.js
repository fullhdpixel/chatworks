Template.channel.events({
  //generic call meteor server method, name of method is based on button id
  'click button': function(event, template) {
    event.preventDefault();
    var cid = $(event.currentTarget).attr('id');
    var cname = $(event.currentTarget).attr('data-id');
    Meteor.call(cid, cname);
  }
});
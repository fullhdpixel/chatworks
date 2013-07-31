Template.alerts.helpers({
  alerts: function() {
    return Alerts.find();
  }
});

Template.alerts.events({
  'click .close': function(event) {
    $(event.currentTarget).parent().hide();
  }
});

Template.alert.rendered = function() {
  var alert = this.data;
  Meteor.defer(function() {
    Alerts.update(alert._id, {$set: {seen: true}});
  });
};
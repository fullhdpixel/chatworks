throwAlert = function(alert) {
  Alerts.insert({message: alert, seen: false});
};

clearAlerts = function() {
  Meteor.call('clearAlerts');
};
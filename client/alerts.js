throwAlert = function(alert) {
  Alerts.insert({message: alert, seen: false});
};

clearAlerts = function() {
  Alerts.remove({seen: true});
};
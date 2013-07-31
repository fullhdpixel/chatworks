Template.ircMonitor.events({
  'click button#start-irc': function(event, template) {
    Meteor.call('startIrc');
  }
});

Template.ircMonitor.events({
  'click button#stop-irc': function(event, template) {
    Meteor.call('stopIrc');
  }
});

Template.ircMonitor.helpers({
  ircMonitor: function() {
    return getStatus('ircMonitor');
  },
  ircConnecting: function() {
    return getStatus('ircConnecting');
  }
});

Template.commandMonitor.events({
  'click button#start-command': function(event, template) {
    Meteor.call('startCommand');
  }
});

Template.commandMonitor.events({
  'click button#stop-command': function(event, template) {
    Meteor.call('stopCommand');
  }
});

Template.commandMonitor.helpers({
  commandMonitor: function() {
    return getStatus('commandMonitor');
  }
});

Template.spamMonitor.events({
  'click button#start-spam': function(event, template) {
    Meteor.call('startSpam');
  }
});

Template.spamMonitor.events({
  'click button#stop-spam': function(event, template) {
    Meteor.call('stopSpam');
  }
});

Template.spamMonitor.helpers({
  spamMonitor: function() {
    return getStatus('spamMonitor');
  }
});

getStatus = function(name) {
  var status = Configs.findOne({name: name});
  if(typeof status !== 'undefined') {
    return status.value;
  }
  return false;
}
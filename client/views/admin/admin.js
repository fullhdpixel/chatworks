Template.admin.helpers({
  configs: function() {
    return Configs.find();
  },
  ircMonitor: function() {
    return getStatus('ircMonitor');
  },
  configsReady: function() {
    return configsHandle.ready();
  }
});

Template.admin.events({
  //generic call meteor server method, name of method is based on button id
  'click #addConfig': function(event, template) {
    event.preventDefault();
    var cid = $(event.currentTarget).attr('id');
    var cname = $('#configName').val();
    var cval = false;
    Meteor.call(cid, cname, cval);
  }
});
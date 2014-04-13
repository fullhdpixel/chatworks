Template.chatworksOnline.helpers({
  online: function() {
    var anHourAgo = new Date();
    anHourAgo.setHours(anHourAgo.getHours() - 1);
    return ChatworksUsers.find({},{lastSeen: {$gte: +anHourAgo}});
  }
});

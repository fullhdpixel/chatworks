Template.chatworksOnline.helpers({
  online: function() {
    return ChatworksUsers.find();
  }
});
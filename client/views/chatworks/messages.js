Template.chatworksMessages.helpers({
  messages: function() {
    return ChatworksMessages.find({}, {sort: {ts: 1}});
  }
});

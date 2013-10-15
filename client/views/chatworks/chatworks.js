Template.chatworks.helpers({
  messages: function() {
    return ChatworksMessages.find({}, {sort: {ts: 1}});
  }
});
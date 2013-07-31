Template.messages.helpers({
  options: function() {
    return {
      sort: {date_time: 1},
      handle: messagesHandle
    }
  }
});

Template.chatPage.helpers({
  messagesForRoom: function() {
    var options = {
      sort: this.sort,
      limit: this.limit
    };
    return Messages.find({}, options);
  }
});
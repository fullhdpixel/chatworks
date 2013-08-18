Template.messages.helpers({
  messagesForRoom: function() {
    var options = {
      sort: this.sort,
      limit: this.limit
    };
    return Messages.find({}, options);
  }
});
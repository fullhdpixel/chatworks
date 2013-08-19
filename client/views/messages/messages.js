Template.messages.helpers({
  messagesForRoom: function() {
    return Messages.find({}, {sort: {date_time: 1}});
  }
});
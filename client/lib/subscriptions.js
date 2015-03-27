chatworksMessagesHandle = subscribeWithPagination('chatworksMessages', Session.get('chatworksRoom'), chatworksLimit);
chatworksRoomsHandle = Meteor.subscribe('chatworksRooms');

var anHourAgo = new Date();
anHourAgo.setTime(anHourAgo.getTime() - 3600000);
chatworksUsersHandle = Meteor.subscribe('chatworksUsers', +anHourAgo);

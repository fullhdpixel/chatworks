ChatworksRooms = new Meteor.Collection('chatworksRooms');
ChatworksMessages = new Meteor.Collection('chatworksMessages');
ChatworksUsers = new Meteor.Collection('chatworksUsers');

if(Meteor.isServer) {
  Meteor.startup(function() {
    ChatworksRooms._ensureIndex({room: 1});
    ChatworksMessages._ensureIndex({room: 1, ts: -1});
    ChatworksUsers._ensureIndex({userId: 1, last_seen: 1});
  })
}
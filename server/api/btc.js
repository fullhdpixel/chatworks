botCommands['.b'] = 'btc';
Meteor.methods({
  btc: function(to) {
    Meteor.call(to, 'coinbase');
    Meteor.call(to, 'btce');
  }
});
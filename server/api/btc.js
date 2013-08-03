botCommands['.b'] = 'btc';
Meteor.methods({
  btc: function(to) {
    Meteor.call('coinbase', to);
    Meteor.call('btce', to);
  }
});
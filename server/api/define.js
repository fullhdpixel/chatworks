botCommands['.d'] = 'define';
Meteor.methods({
  define: function(to, query) {
    Meteor.call('dictionary', to, query);
    Meteor.call('urbandictionary', to, query);
  }
});
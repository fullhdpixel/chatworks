Template.nouns.helpers({
  nouns: function() {
    return Nouns.find();
  }
});

Template.nouns.events({
  'click button, keyup input': function() {
    if (event.type === 'click' || (event.type === 'keyup' && event.which === 13)) {
      Meteor.call('addNoun', $('#nounName').val());
      $('#nounName').val('');
    }
  }
});
Meteor.Router.add({
  '/': 'chatPage'
});

Template.body.helpers({
  layoutName: function() {
    switch (Meteor.Router.page()) {
      case 'chatPage':
        return 'userLayout';
      default:
        return 'userLayout';
    }
  }
});
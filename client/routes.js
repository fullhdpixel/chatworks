Meteor.Router.add({
  '/': 'chatPage',
  '/analyze': 'analyzePage',
  '/admin': 'adminPage'
});

Template.body.helpers({
  layoutName: function() {
    switch (Meteor.Router.page()) {
      case 'adminPage':
        return 'adminLayout';
      case 'analyzePage':
        return 'userLayout';
      case 'chatPage':
        return 'userLayout';
      default:
        return 'userLayout';
    }
  }
});
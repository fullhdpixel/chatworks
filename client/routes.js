Meteor.Router.add({
  '/': {to: 'newMessages',
    as: function() {
      return 'home';
    }
  }
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

Meteor.Router.filters({
  'requireLogin': function(page) {
    if (Meteor.user())
      return page;
    else if (Meteor.loggingIn())
      return 'loading';
    else
      return 'accessDenied';
  },
  'clearErrors': function(page) {
    clearErrors();
    return page;
  }
});
Meteor.Router.filter('requireLogin', {only: 'postSubmit'});
Meteor.Router.filter('clearErrors');
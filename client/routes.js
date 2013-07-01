Meteor.Router.add({
  '/': {to: 'newMessages',
    as: function() {
      return 'home';
    }
  },
  '/links': {to: 'newLinks', as: 'links' }
});

Template.body.helpers({
  layoutName: function() {
    switch (Meteor.Router.page()) {
      case 'linkPage':
        return 'userLayout';
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
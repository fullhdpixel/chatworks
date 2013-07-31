Meteor.Router.add({
  '/': {to: 'messages',
    as: function() {
      return 'home';
    }
  },
  '/links': {to: 'links', as: 'links' },
  '/admin': {to: 'admin', as: 'admin' },
  '/nouns': {to: 'nouns', as: 'nouns' }
});

Template.body.helpers({
  layoutName: function() {
    switch (Meteor.Router.page()) {
      case 'links':
        return 'linksLayout';
      case 'messages':
        return 'chatLayout';
      case 'nouns':
        return 'chatLayout';
      case 'admin':
        return 'adminLayout';
      default:
        return 'defaultLayout';
    }
  }
});

Meteor.Router.filters({
  //login wall
  'requireLogin': function(page) {
    if (Meteor.user())
      return page;
    else if (Meteor.loggingIn())
      return 'loggingIn';
    else
      return 'accessDenied';
  },
  //clear seen alerts on page change
  'clearAlerts': function(page) {
    clearAlerts();
    return page;
  }
});
Meteor.Router.filter('requireLogin');
Meteor.Router.filter('clearAlerts');
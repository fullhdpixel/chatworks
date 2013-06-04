Meteor.Router.add({
  '/': {to: 'newMessages', as: 'home'},
  '/top': {to: 'topMessages'},
  '/analysis': {to: 'analysisPage'}
});

Template.body.helpers({
  layoutName: function() {
    switch (Meteor.Router.page()) {
      case 'analysisPage':
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
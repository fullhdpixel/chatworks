Template.chatHeader.helpers({
  currentRoom: function() {
    return Session.get('room');
  },
  currentUser: function () {
    return Meteor.currentUser();
  }
});

Template.chatHeader.events = {
  'keyup #room': function(event) {
    event.preventDefault();
    // if we tapped the button or hit enter
    if (event.type === 'keyup' && event.which === 13) {
      // trim textbox
      var room_id = $('#room').val().substring(0,32);

      Meteor.call('add_room', room_id, function(error, id) {
        if(error) {
          throwError("error: "+error.reason);
        } else {
          $('#room').val('');
        }
      });
    }
  },
  'keyup #search': function(event) {
    event.preventDefault();
    // if we tapped the button or hit enter
    if (event.type === 'keyup' && event.which === 13) {
      // trim textbox
      var query = $('#search').val().substring(0,32);
      alert(query);

      Meteor.call('search', query, function(error, id) {
        if(error) {
          throwError("error: "+error.reason);
        }
      });
    }
  },
  'click #refresh': function(event) {
    Meteor.call('refresh');
  }
};

Template.showStats.helpers({
  showStats: function() {
    return Session.get('show_stats');
  }
});

Template.showStats.events = {
  'click .show-stats': function(event) {
    if(Session.get('show_stats') === false) {
      Session.set('show_stats', true);
    } else {
      Session.set('show_stats', false);
    }
    event.preventDefault();
  }
};

Template.loadMore.helpers({
  messagesReady: function() {
    return messagesHandle.ready();
  },
  allMessagesLoaded: function() {
    return !messagesHandle.ready() && Messages.find({}).count() < messagesHandle.loaded();
  }
});

Template.loadMore.events = {
  'click .load-more': function(event) {
    Session.set('auto_scroll', false);
    event.preventDefault();
    messagesHandle.loadNextPage();
  }
};
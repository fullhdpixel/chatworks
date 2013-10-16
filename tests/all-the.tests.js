if(Meteor.isServer) {
  Meteor.startup(function() {
    ChatworksMessages.remove({});
  });
}

if(Meteor.isClient) {
  testAsyncMulti('Insert Message', [
    function(test, expect) {
      subscribeWithPagination('chatworksMessages', '#test', 10);
      var message = 'test is a go';
      Meteor.call('addMessage', '#test', message);
      Meteor.setTimeout(expect(function(error, result) {
        var cursor = ChatworksMessages.find();
        test.equal(cursor.count(), 1);
        cursor = ChatworksMessages.findOne();
        test.equal(cursor.message, message);
      }), 500);
    }
  ]);
}
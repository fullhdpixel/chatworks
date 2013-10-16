Package.describe({
  summary: 'A chat package that you can plugin to any Meteor project'
});

Package.on_use(function (api) {
  api.use(['standard-app-packages'], ['client','server']);
  api.use(['less'], 'client');
  // must use imply so that the parent app can use routes without explicitly adding it
  api.add_files([
    'client/lib/custom_paginated_subscription.js'
    ,'client/lib/defaults.js'
    ,'client/lib/subscriptions.js'
    ,'client/stylesheets/chatworks.less'
    ,'client/views/chatworks/header.html'
    ,'client/views/chatworks/header.js'
    ,'client/views/chatworks/message_box.html'
    ,'client/views/chatworks/message_box.js'
    ,'client/views/chatworks/message.html'
    ,'client/views/chatworks/message.js'
    ,'client/views/chatworks/chatworks.html'
    ,'client/views/chatworks/chatworks.js'
    ,'client/views/rooms/room_item.html'
    ,'client/views/rooms/room_item.js'
    ,'client/views/rooms/rooms_list.html'
    ,'client/views/rooms/rooms_list.js'
    ,'client/views/users/online.html'
    ,'client/views/users/online.js'
    ,'client/client.js'
    ], 'client');
  api.add_files([
    'lib/collections.js'
    ,'lib/shared.js'
    ], ['client','server']);
  api.add_files([
    'server/server.js'
    ,'server/publications.js'
    ,'server/security.js'
    ], 'server');
  api.export(['ChatworksMessages', 'ChatworksRooms', 'ChatworksUsers', 'subscribeWithPagination'], ['server', 'client']);
});

Package.on_test(function(api) {
  api.use(['chatworks', 'tinytest', 'test-helpers'], ['client', 'server']);
  api.add_files(['tests/all-the.tests.js'],['client', 'server']);
});
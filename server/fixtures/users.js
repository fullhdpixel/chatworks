if (Meteor.users.find().count() === 0) {
  var userId = Accounts.createUser({
    'username': 'Admin',
    'email': 'test@test.com',
    'password': 'qwert4321',
    'profile': {
      'name': 'John Doe'
    }
  });
  Meteor.users.update({ _id: userId }, { $set: { role: 'admin' } });
}

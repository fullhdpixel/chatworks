// Local (client-only) collection
Errors = new Meteor.Collection(null);

throwError = function(error) {
  Errors.insert({message: error, seen: false});
};

clearErrors = function() {
  Errors.remove({seen: true});
};
Meteor.methods({
  addConfig: function(cname, cvalue) {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    var check = Configs.findOne({name: cname});
    if(typeof check === 'undefined') {
      Configs.insert({name: cname, value: cvalue, confirmed: true});
    } else {
      Configs.update({name: cname}, {$set: { value: cvalue, confirmed: true }});
    }
  },
  updateConfig: function(document) {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    Configs.update({name: document.name}, {$set: {value: document.value, confirmed: true}});
  },
  removeConfig: function(cname) {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    var check = Configs.findOne({name: cname});
    if(typeof check !== 'undefined') {
      Configs.remove({name: cname});
    }
  }
});

privateAddConfig = function(cname, cvalue) {
  var check = Configs.findOne({name: cname});
  if(typeof check === 'undefined') {
    Configs.insert({name: cname, value: cvalue, confirmed: true});
  } else {
    Configs.update({name: cname}, {$set: { value: cvalue, confirmed: true }});
  }
};
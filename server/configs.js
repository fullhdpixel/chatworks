_addConfig = function(name, value) {
  var check = Configs.findOne({name: name});
  if(typeof check === 'undefined') {
    Configs.insert({name: name, value: value, confirmed: !this.isSimulation});
  } else {
    Configs.update({name: name}, {$set: { value: value, confirmed: !this.isSimulation }});
  }
}
_updateConfig = function(document) {
  Configs.update({name: document.name}, {$set: {value: document.value, confirmed: !this.isSimulation}});
}
_removeConfig = function(name) {
  var check = Configs.findOne({name: name});
  if(typeof check !== 'undefined') {
    Configs.remove({name: name});
  }
}

Meteor.methods({
  addConfig: function(name, value) {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    _addConfig(name, value);
  },
  updateConfig: function(document) {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    _updateConfig(document);
  },
  removeConfig: function(name) {
    //todo: messy admin checks EVERYWHERE (this is horrible)
    if ( ! Meteor.user() ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    if ( Meteor.user().role !== 'admin' ) {
      throw new Meteor.Error(401, "You are not authorized to perform this action");
    }
    _removeConfig(name);
  }
});

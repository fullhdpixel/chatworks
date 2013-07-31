Meteor.methods({
  addConfig: function(cname, cvalue) {
    var check = Configs.findOne({name: cname});
    if(typeof check === 'undefined') {
      Configs.insert({name: cname, value: cvalue, confirmed: true});
    } else {
      Configs.update({name: cname}, {$set: { value: cvalue, confirmed: true }});
    }
  },
  updateConfig: function(document) {
    if(Meteor.call('admin')) {
      Configs.update({name: document.name}, {$set: {value: document.value, confirmed: true}});
    }
  },
  removeConfig: function(cname) {
    var check = Configs.findOne({name: cname});
    if(typeof check !== 'undefined') {
      Configs.remove({name: cname});
    }
  }
});
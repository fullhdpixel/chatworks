/**
 * Run these processes every interval
 */
Meteor.startup(function () {
  Date.prototype.lastMinutes = function(m){
    this.setMinutes(this.getMinutes() - m);
    return this;
  };

  Date.prototype.lastHours = function(h){
    this.setHours(this.getHours() - h);
    return this;
  };

  var perMinute;
  if(perMinute !== undefined) Meteor.clearInterval(perMinute);
  perMinute = Meteor.setInterval(
    function() {
      //get last hour
      var messages = Messages.find({date_time: {$gte: new Date().lastMinutes(1)}});
      Stats.insert({
        timestamp: new Date().getTime(),
        count: messages.count()
      });
    }, minutely
  );
});

var generateConnections = function() {
  Interactions.remove({});
  var all = Messages.find().fetch();
  var distinctArray = _.uniq(all, false, function(d) {return d.handle});
  var disctinctValues = _.pluck(distinctArray, 'handle');
  _.each(disctinctValues, function(handle) {
    var count = Messages.find({handle: handle}).count();
    Interactions.insert({name: handle, count: count});
  });
};

Meteor.methods({
  getCompleteCharts: function() {
    var all = Messages.find().fetch();
    var distinctArray = _.uniq(all, false, function(d) {return d.handle});
    var disctinctValues = _.pluck(distinctArray, 'handle');
    var data = [];
    _.each(disctinctValues, function(handle) {
      var count = Messages.find({handle: handle}).count();
      //minimum activity
      if(count > 10) {
        data.push({handle: handle, count: count});
      }
    });
    return data;
  }
});

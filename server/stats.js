/**
 * Run these processes every interval
 */
Meteor.startup(function () {
  Date.prototype.lastMinutes = function(m){
    this.setMinutes(this.getMinutes() - m);
    return this;
  }

  Date.prototype.lastHours = function(h){
    this.setHours(this.getHours() - h);
    return this;
  }

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
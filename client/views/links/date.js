Template.dateItem.helpers({
  prettyTime: function() {
    if(!this.date_time) return "";
    var val = this.date_time;
    var parsed = new Date(val);
    return (parsed.getMonth()+1)+'/'+(parsed.getDate());
  }
});

Template.imagesOnly.helpers({
  link_date: function() {
    return Session.get('link_date');
  }
});

Template.dateItem.events = {
  'click li': function(event) {
    event.preventDefault();
    Session.set('link_date', event.target.text());
  }
};
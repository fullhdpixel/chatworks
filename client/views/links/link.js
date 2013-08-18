Template.linkItem.helpers({
  isImage: function() {
    if(Session.get('images_only')) {
      var val = this.url;
      return val.match(/((http|https):\/\/([ \S]+\.(jpg|jpeg|png|gif)))/ig);
    }
    return true;
  },
  linkify: function() {
    var val = this.url;
    var exp = /((http|https):\/\/([ \S]+\.(jpg|jpeg|png|gif)))/ig;
    if(val.match(exp)) {
      val = val.replace(exp, '<a href="$1" class="pull-left" target="_blank"><img class="media-object" src="$1"></a>');
    } else {
      val = '<a href="'+val+'" class="pull-left" target="_blank"><img class="media-object" src="/img/default.png"></a>';
    }
    return val;
  },
  caption: function() {
    var val = this.url;
    return url_domain(val);
  },
  prettyTime: function() {
    if(!this.date_time) return "";
    var val = this.date_time;
    var parsed = new Date(val);
    return (parsed.getMonth()+1)+'/'+(parsed.getDate()) + '  ' + ('0'+parsed.getHours()).substr(-2,2)+':'+('0'+parsed.getMinutes()).substr(-2,2);
  }
});

function url_domain(data) {
  var    a      = document.createElement('a');
         a.href = data;
  return a.hostname;
}

Template.imagesOnly.helpers({
  imagesOnly: function() {
    return Session.get('images_only');
  }
});

Template.imagesOnly.events = {
  'click .images-only': function(event) {
    if(Session.get('images_only') === false) {
      Session.set('images_only', true);
    } else {
      Session.set('images_only', false);
    }
    event.preventDefault();
  }
};

Template.linkItem.events = {
  'click': function(evt) {
    Session.set('auto_scroll', false);
  }
};


Template.linkItem.rendered = function() {
  $(this.find('.link')).hide().fadeIn(800);
};
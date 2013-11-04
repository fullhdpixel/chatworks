Meteor.startup(function () {
  var pingTimer = 10000;
  // every ping, remove inactive users from online list
  Meteor.setInterval(function() {
    var minuteAgo = new Date;
    // remove users that haven't replied in a minute
    minuteAgo.setMinutes(minuteAgo.getMinutes() - 1);
    ChatworksUsers.remove({last_seen: {$lt: +minuteAgo}});
  }, pingTimer);
});

Meteor.methods({
  addMessage: function(room, message) {
    this.unblock();
    var maxMessageLength = 400;
    // todo race conditions
    var isUser = ChatworksUsers.findOne({userId: this.userId});
    var now = new Date;
    var secondsAgo = new Date;
    secondsAgo.setSeconds(now.getSeconds() - 1);
    var handle = '';
    if(Meteor.users && Meteor.user() && Meteor.user().username) {
      handle = Meteor.user().username;
    }
    if(isUser) {
      handle = isUser.handle;
    }
    var flood = ChatworksMessages.findOne({userId: this.userId, ts: {$gt: +secondsAgo }});
    if(!flood) {
      // message length control
      message = message.substring(0, maxMessageLength);
      // finally add the message
      ChatworksMessages.insert({
        userId: this.userId,
        handle: handle,
        room: room,
        message: message,
        ts: +now
      });
    }
  },
  onlineCheck: function() {
    //set a userId if unavailable
    if(!this.userId) {
      this.setUserId(Random.id());
    }
    this.unblock();
    var isUser = ChatworksUsers.findOne({userId: this.userId});
    //if user but no handle
    var now = +new Date;
    if(typeof isUser != 'undefined' && typeof isUser.handle != 'undefined') {
      ChatworksUsers.upsert({userId: this.userId},{$set:{last_seen: now}});
    } else {
      if(Meteor.users && Meteor.user() && Meteor.user().username) {
        //if accounts enabled, and is a real account with a username, set the ChatworksUser handle to username
        ChatworksUsers.upsert({userId: this.userId},{$set:{handle: Meteor.user().username, registered: true, last_seen: now}});
      } else {
        //if no user, set a random handle
        var handle = haiku();

        ChatworksUsers.upsert({userId: this.userId},{$set:{handle: handle, registered: false, last_seen: now}});
      }
    }
  }
});

//thanks random SO answer.
function haiku(){
  var adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry",
    "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring",
    "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered",
    "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
    "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
    "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
    "wandering", "withered", "wild", "black", "young", "holy", "solitary",
    "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
    "polished", "ancient", "purple", "lively", "nameless"]

    , nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea",
  "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn",
  "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird",
  "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower",
  "firefly", "feather", "grass", "haze", "mountain", "night", "pond",
  "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf",
  "thunder", "violet", "water", "wildflower", "wave", "water", "resonance",
  "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
  "frog", "smoke", "star"];

  return adjs[Math.floor(Math.random()*(adjs.length-1))]+""+nouns[Math.floor(Math.random()*(nouns.length-1))]+Math.floor(Math.random()*99);
}

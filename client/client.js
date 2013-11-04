var pingTimer = 10000;

Meteor.startup(function() {
  // periodically ping users to check for online status
  Meteor.call('onlineCheck');
  Meteor.setInterval(function(){
    Meteor.call('onlineCheck');
  }, pingTimer);
});

/**
 * Auto-scroll the chat to the bottom
 * @param handle
 * @returns {}
 */
var timer = null;
scrollToBottom = function() {
  clearTimeout(timer);
  if(autoScroll) {
    timer = setTimeout(function (){
      $('#chatworks-messages').animate({scrollTop: 999999}, 1000);
    }, 90);
  }
};

/**
 * Fades in new elements
 */
fadeIn = function() {
  $('div.message:last').hide().fadeIn();
};

Handlebars.registerHelper('colorize', function() {
  return colorHandle(this["handle"]);
})

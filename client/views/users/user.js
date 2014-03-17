Template.onlineUser.rendered = function() {
  $(this.find('span')).css('color', colorHandle(this.data.handle));
}
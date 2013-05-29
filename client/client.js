ext = window.location.pathname.split('/').pop().substring(0,75);
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    Session.set('lat', position.coords.latitude);
    Session.set('lon', position.coords.longitude);
  }, function(error) {

  }, { enableHighAccuracy: true });
}
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

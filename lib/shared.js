/**
 * Set a color based on handle
 * @param handle
 * @returns string
 */
colorHandle = function(handle) {
  var hue = 250;
  var hash = 0;
  if(handle) {
    for(var i = 0; i < handle.length; i++) {
      hash = ((hash<<5)-hash)+handle.charCodeAt(i);
      hash &= hash; //convert to 32bit int
    }
    hash = "" + hash;
    if(handle.charCodeAt(0) >= 20) {
      hue = 3 + hash.substring(2);
      if(hash.substring(2) > 60) {
        hue = 3 + hash.substring(1);
      }
    } else if(handle.charCodeAt(0) >= 15) {
      hue = 2 + hash.substring(2);
    } else if(handle.charCodeAt(0) >= 10) {
      hue = 1 + hash.substring(2);
    } else {
      hue = hash.substring(2);
    }
  }
  return 'hsla('+hue+',46%,75%,1)';
};
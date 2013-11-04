/**
 * Set a color based on handle
 * @param handle
 * @returns string
 */
colorHandle = function(handle) {
  var sumi = 0;
  for(var i = 0; i < handle.length; i++) {
    sumi += handle.charCodeAt(i);
  }
  var hue = sumi % 360;
  return 'hsl('+hue+',46%,75%)';
};

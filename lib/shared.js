colorHandle = function(handle) {
    var sumi = 0;
    try {
        for (var i = 0; i < handle.length; i++) {
            sumi += handle.charCodeAt(i);
        }
    } catch (e) {}
    var hue = sumi % 360;
    return 'hsl(' + hue + ',46%,75%)';
};

var system = require('system')
  , page = require('webpage').create();

// Read in arguments
var args = {};
[ 'site'
, 'windowWidth'
, 'windowHeight'
, 'userAgent'
, 'renderDelay'
].forEach(function(name, i) {
  args[name] = system.args[i + 1];
});

// Set the window size
page.viewportSize = {
  width: args.windowWidth
, height: args.windowHeight
};

// Set the user agent string
if (args.userAgent) {
  page.settings.userAgent = args.userAgent;
}

var whenLoadFinished = function(status) {
  if (status === 'fail') {
    page.close();
    phantom.exit(1);
    return;
  }

  // Wait `args.renderDelay` seconds for the page's JS to kick in
  window.setTimeout(function () {

    // Determine the page's dimensions
    var pageDimensions = page.evaluate(function() {
      var body = document.body || {};
      var documentElement = document.documentElement || {};
      return {
        width: Math.max( 
          body.offsetWidth
        , body.scrollWidth
        , documentElement.clientWidth
        , documentElement.scrollWidth
        , documentElement.offsetWidth
        )
      , height: Math.max(
          body.offsetHeight
        , body.scrollHeight
        , documentElement.clientHeight
        , documentElement.scrollHeight
        , documentElement.offsetHeight
        )
      };
    });

    /*
     * Given a shotSize dimension, return the actual number of pixels in the 
     * dimension that phantom should render.
     *
     * @param (String) dimension
     * @param (String or Number) value
     */
    var pixelCount = function(dimension, value) {
      return {
        window: args[{
          width: 'windowWidth'
        , height: 'windowHeight'
        }[dimension]]
      , all: pageDimensions[dimension]
      }[value] || value
    };

    // Set the rectangle of the page to render
    page.clipRect = {
      top: 0
    , left: 0
    , width: pixelCount('width', args.windowWidth)
    , height: pixelCount('height', args.windowHeight)
    };

    renderCleanUpExit();

  }, args.renderDelay);
  
  // Render, clean up, and exit
  function renderCleanUpExit() {
    console.log(page.renderBase64(args.streamType));
    page.close();
    phantom.exit(0);
  }
}

page.onError = function(msg, trace) { console.log(msg); };
page.onConsoleMessage = function(msg, lineNum, sourceId) { console.log(msg); };
page.open(args.site, whenLoadFinished);

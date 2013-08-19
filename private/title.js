var system = require('system')
  , page = require('webpage').create();

// Read in arguments
var args = {};
[ 'site'
, 'userAgent'
, 'renderDelay'
].forEach(function(name, i) {
  args[name] = system.args[i + 1];
});

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
    renderCleanUpExit();
  }, args.renderDelay);

  // Render, clean up, and exit
  function renderCleanUpExit() {
    var title = page.evaluate(function () {
      console.log(document.title);
    });
    page.close();
    phantom.exit(0);
  }
}

page.onError = function(msg, trace) { console.log(msg); };
page.onConsoleMessage = function(msg, lineNum, sourceId) { console.log(msg); };
page.open(args.site, whenLoadFinished);
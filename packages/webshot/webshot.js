//converted to meteor smart package
var url = Npm.require('url')
  , fs = Npm.require('fs')
  , stream = Npm.require('stream')
  , buffer = Npm.require('buffer')
  , childProcess = Npm.require('child_process')
  , path = Npm.require('path')
  , phantomScript = path.resolve('.') + '/assets/app/streamshot.js';

// Default options
var defaults = {
  windowSize: {
    width: 1280
    , height: 1280
  }
  , userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36'
  , renderDelay: 10000
  , timeout: 200000
};

// Apply the compiled phantomjs path only if it compiled successfully, currently has no permissions after compile
try { defaults.phantomPath = Npm.require('phantomjs').path } catch (ex) { }

Webshot = function() {
  // Process arguments
  var args = Array.prototype.slice.call(arguments, 0);
  var cb = args.pop();
  var site = args.shift();
  var arg = args.pop();
  var options = arg;

  // Fill in defaults for undefined options
  Object.keys(defaults).forEach(function(key) {
    options[key] = options[key] || defaults[key];
  });

  // Add protocol to the site url if not present
  if (options.siteType == 'url') {
    site = url.parse(site).protocol ? site : 'http://' + site;
  }

  //stream to Buffer
  var spawn = spawnPhantom.bind(null, site, options, cb);
  spawn();
};


/*
 * Spawn a phantom instance to take the screenshot
 *
 * @param (String) site
 * @param (Object) options
 * @param (Function) cb
 */
function spawnPhantom(site, options, cb) {
  var phantomArgs = [
    phantomScript
    , site
    , options.windowSize.width
    , options.windowSize.height
    , options.userAgent
    , options.renderDelay
  ].map(function(arg) {
      return arg.toString();
    });

  if (options.phantomConfig) {
    phantomArgs = Object.keys(options.phantomConfig).map(function (key) {
      return '--' + key + '=' + options.phantomConfig[key];
    }).concat(phantomArgs);
  }

  var phantomProcess = childProcess.spawn('phantomjs', phantomArgs);

  // This variable will contain our timeout ID.
  var timeoutID = null;

  // Whether or not we've called our callback already.
  var calledCallback = false;
  var err = null;
  phantomProcess.on('close', function(code) {
    clearTimeout(timeoutID);
  });

  // Only set the timer if the timeout has been specified (by default it's not).
  if (options.timeout) {
    timeoutID = setTimeout(function() {

      // The phantomjs process didn't exit in time.
      // Double-check we didn't already call the callback already as that would happen
      // when the process has already exited. Sending a SIGKILL to a PID that might
      // be handed out to another process could be potentially very dangerous.
      if (!calledCallback) {
        calledCallback = true;

        // Send the kill signal
        phantomProcess.kill('SIGKILL');

        // Call our callback.
        cb(new Error('PhantomJS did not respond within the given timeout setting.'));
      }
    }, options.timeout);
  }

  var readable = new stream.Stream();
  readable.readable = true;

  phantomProcess.stdout.setEncoding('utf8');
  phantomProcess.stdout.on('data', function(data) {
    clearTimeout(timeoutID);
    readable.emit('data', new buffer.Buffer(''+data, 'base64'));
  });
  phantomProcess.on('exit', function(code) {
    if(code) err = new Error('PhantomJS exited with return value ' + code);
    readable.emit('end');
  });

  cb(err, readable);
}
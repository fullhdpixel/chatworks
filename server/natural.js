var require = Npm.require;
var path = require("path");
var fs = require('fs');

//local/server node_module setup
//this is a messy workaround for how meteor handles packaging node_modules
var base = path.resolve('.');
if (base == '/'){
  base = path.dirname(global.require.main.filename);
}

var devPath = path.resolve(base+'/public/node_modules/natural');
var prodPath = path.resolve(base+'/bundle/static/node_modules/natural');

if (fs.existsSync(devPath)) {
  natural = require(devPath);
} else if (fs.existsSync(prodPath)) {
  natural = require(prodPath);
} else {
  console.log('natural not found in ' + base);
}
//irc requires
var require = Npm.require;
var path = require("path");
var fs = require('fs');

//local/server node_module setup
//this is a messy workaround for how meteor handles packaging node_modules
var base = path.resolve('.');
if (base == '/'){
  base = path.dirname(global.require.main.filename);
}

var devIRCPath = path.resolve(base+'/public/node_modules/irc');
var prodIRCPath = path.resolve(base+'/bundle/static/node_modules/irc');

if (fs.existsSync(devIRCPath)) {
  irc = require(devIRCPath);
} else if (fs.existsSync(prodIRCPath)) {
  irc = require(prodIRCPath);
  config.ircServer = config.devServer;
} else {
  console.log('irc not found in ' + base);
}

//irc connection setup
client = new irc.Client(config.ircServer, config.botName, {
  userName: config.botName,
  realName: config.botName + ' Watson',
  debug: false,
  showErrors: false,
  autoRejoin: true,
  autoConnect: false,
  channels: [config.ircChannel],
  secure: false,
  selfSigned: false,
  certExpired: false,
  floodProtection: true,
  floodProtectionDelay: 1500,
  stripColors: false,
  messageSplit: 512
});

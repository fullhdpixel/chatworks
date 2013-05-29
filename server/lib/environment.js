//irc requires
var require = Npm.require;
var path = require("path");
var fs = require('fs');
//fiber
Fiber = require("fibers");
Future = require("fibers/future");

//dev/prod config
var base = path.resolve('.');
if (base == '/'){
  base = path.dirname(global.require.main.filename);
}

if (fs.existsSync(path.resolve(base+'/bundle/'))) {
  config.monitorIrc = true;
} else {
  config.ircServer = config.devServer;
}
//irc connection setup
client = new IRC.Client(config.ircServer, config.botName, {
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

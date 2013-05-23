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

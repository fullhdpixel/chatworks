//todo: doesn't work since meteor 0.6.5
//requires
var require = Npm.require;
var path = require("path");
var fs = require('fs');
Fiber = require("fibers");
Future = require("fibers/future");

//dev/prod config
var base = path.resolve('.');
if (base == '/'){
  base = path.dirname(global.require.main.filename);
}
ENVIRONMENT = 'development';

if (fs.existsSync(path.resolve(base+'/bundle/'))) {
  ENVIRONMENT = 'production';
}
natural = Natural;
wordnet = new natural.WordNet();
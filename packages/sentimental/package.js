Package.describe({
  summary: "Meteor smart package for sentimental node.js package"
});

Npm.depends({
  "Sentimental": "0.0.4"
});

Package.on_use(function (api) {
  api.add_files("sentimental.js", "server");
});
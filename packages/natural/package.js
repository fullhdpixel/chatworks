Package.describe({
  summary: "Meteor smart package for natural node.js package"
});

Npm.depends({
  "WNdb": "3.0.1",
  "natural": "0.1.21"
});

Package.on_use(function (api) {
  api.add_files("natural.js", "server");
});
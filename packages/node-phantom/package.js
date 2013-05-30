Package.describe({
    summary: "Meteor smart package for phantom node.js package"
});

Npm.depends({
    "node-phantom": "0.2.3"
});

Package.on_use(function (api) {
    api.add_files("node-phantom.js", "server");
});
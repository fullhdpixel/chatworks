Package.describe({
    summary: "Meteor smart package for optimist node.js package"
});

Npm.depends({
    "optimist": "0.5.1"
});

Package.on_use(function (api) {
    api.add_files("optimist.js", "server");
});
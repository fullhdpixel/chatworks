Package.describe({
    summary: "Meteor smart package for focus node.js package"
});

Npm.depends({
    "focus": "0.0.1"
});

Package.on_use(function (api) {
    api.add_files("focus.js", "server");
});
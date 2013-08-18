Package.describe({
    summary: "Meteor smart package for irc node.js package"
});

Npm.depends({
    "irc": "0.3.6"
});

Package.on_use(function (api) {
    api.add_files("irc.js", "server");
    api.export("IRC", "server");
});
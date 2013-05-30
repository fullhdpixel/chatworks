Package.describe({
    summary: "Meteor smart package for phantom node.js package"
});

Npm.depends({
    "phantomjs": "1.9.0-6"
});

Package.on_use(function (api) {
    api.add_files("phantomjs.js", "server");
});
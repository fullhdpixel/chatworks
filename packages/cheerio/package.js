Package.describe({
    summary: "Meteor smart package for cheerio node.js package"
});

Npm.depends({
    "cheerio": "0.11.0"
});

Package.on_use(function (api) {
    api.add_files("cheerio.js", "server");
});
Package.describe({
  summary: "Headless screenshots of the web using phantomjs"
});

Npm.depends({
  "phantomjs": "1.9.1-5"
});

Package.on_use(function(api) {
  api.add_files('webshot.js', 'server');
  api.add_files('webtitle.js', 'server');
  api.export('Webshot', 'server');
  api.export('Webtitle', 'server');
});
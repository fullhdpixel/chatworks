/**
 * AI responses to various triggers
 * @param handle
 * @param to
 * @param msg
 * @returns void
 */
processMessage = function(handle, to, msg) {
  var split = msg.split(' ');
  var cmd = split[0];
  split.shift();
  var query = split.join(' ');
  if(!query) {
    var previousLine = Messages.find({bot: false}, {limit: 2, sort: {'date_time': -1}});
    query = previousLine.fetch()[1].message;
  }
  _.each(botCommands, function(val, key) {
    if(key === cmd) {
      if(key.startsWith('.')) {
        Meteor.call(val, to, query);
      } else {
        if(val === '') {
          Meteor.call(key, to, query);
        } else {
          Bot.say(to, val);
        }
      }
    }
  });
  //add url messages to url collection
  if (checkURL(msg)) {
    var url = getURL(msg);
    //check if url has http, append if not
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    //import buffer
    var Buffer = Npm.require('buffer');
    //regex for domain name
    var exp = /[a-zA-Z0-9](-*[a-zA-Z0-9]+)*(\.[a-zA-Z0-9](-*[a-zA-Z0-9]+)*)+/i;
    //grab just domain
    var name = exp.exec(url)[0];
    //png filename
    var filename = name + '.png';
    var meta = Messages.find({bot: false}, {limit: 2, sort: {'date_time': -1}}).fetch();
    Webtitle(url, [], Meteor.bindEnvironment(function(error, title) {
      Webshot(url, [], function(error, readableStream) {
        var body = [];
        readableStream.on('data', function(chunk) {
          body.push(new Buffer.Buffer(chunk));
        });
        readableStream.on('end', Meteor.bindEnvironment(function() {
          var buffer = Buffer.Buffer.concat(body);
          postFile(url, name, title, to, meta, filename, buffer);
        }, function(e) {
          Meteor._debug("Exception from connection close callback:", e);
        }));
      });
    }, function(e) {
      Meteor._debug("Exception from connection close callback:", e);
    }));
  }
};

postFile = function(url, name, title, to, meta, filename, body) {
  console.log('logged url: ' + url + ' ' + name + ' ' + title + ' ' + to + ' ' + meta + ' ' + filename);
  HTTP.post('https://www.filepicker.io/api/store/S3?key='+config.filepickerkey+'&base64decode=false&mimetype=image/png&filename='+filename+'&access=public', {
      header: {
        'transfer-encoding': 'chunked'
      },
      content: body
    }, function(error, response) {
      if(!error) {
        Urls.insert({
          url: url,
          name: name,
          title: title,
          room_id: to,
          meta_before: '<'+meta[1].handle+'> '+meta[1].message,
          meta_after: '<'+meta[0].handle+'> '+meta[0].message,
          filepicker: response.data.url,
          image: config.amazonUrl + response.data.key,
          date_time: new Date()
        });
      } else {
        console.log(error);
      }
    }
  );
};
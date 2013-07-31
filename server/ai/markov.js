// house of chains
botCommands['chatworks'] = '';
var NGrams = natural.NGrams;
Meteor.methods({
  'bigram': function(sentence) {
    var tokenizer = new natural.TreebankWordTokenizer();
    var result = [];
    var sequence;
    var sequences = [];
    var n = 2;
    var skip =  Messages.find({}).count();
    var boundary = Math.floor(Math.random()*skip);
    var documents = Messages.find({}, {limit: 10, skip: boundary});
    documents.forEach(function(document) {
      sequence = tokenizer.tokenize(document.message);
      sequences.push(sequence);
    });

    var counti = _.max([0, sequences.length - n + 1]);
    for (var i = 0; i < counti; i++) {
      var countj = _.max([0, sequences[i].length - n + 1]);
      for(var j = 0; j < countj; j++) {
        var word = sequences[i].slice(j, j + n);
        var stem = natural.LancasterStemmer.stem(word);
        result.push(stem);
      }
    }
    console.log(result);
    //todo: deal with contractions and possessives
  },
  'chatworks': function(to) {
    var msg = Messages.findOne({}, {skip: Math.floor(Math.random() * BOUNDRY_COUNT)});
    if(msg.message) {
      Bot.say(to, msg.message);
    }
  }
});
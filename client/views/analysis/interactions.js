Template.interactions.destroyed = function () {
  //tear down the autorun
  delete graphArea;
};

Template.interactions.rendered = function() {
  var self = this;
  if(typeof graphArea === 'undefined') {
    graphArea = new GraphArea(self.find('#interactions'));
    graphArea.createSvg();
  }
  //setup an autorun on render
  Meteor.call('getCompleteCharts', function(error, result) {
    if(!error) {
      graphArea.setData(result);
      graphArea.go();
    }
  });
};

Template.interactions.helpers({
  interactions: function() {
    return Interactions.find();
  }
});
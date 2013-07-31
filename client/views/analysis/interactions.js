Template.interactions.destroyed = function () {
  //tear down the autorun
  chartRender && chartRender.stop();
  graphArea = 'undefined';
};

Template.interactions.rendered = function() {
  var self = this;
  if(typeof graphArea === 'undefined') {
    graphArea = new GraphArea(self.find('#interactions'));
    graphArea.createSvg();
  }
  //setup an autorun on render
  chartRender = Deps.autorun(function() {
    Meteor.call('getCompleteCharts', function(error, result) {
      if(!error) {
        graphArea.setData(result);
        graphArea.go();
      }
    });
  });
};

Template.interactions.helpers({
  interactions: function() {
    return Interactions.find();
  }
});
//fill chart with initial values
Date.prototype.lastMinutes = function(m) {
  this.setMinutes(this.getMinutes() - m);
  return this.getTime();
}

Date.prototype.lastHours = function(h) {
  this.setHours(this.getHours() - h);
  return this.getTime();
}

Template.chart.rendered = function() {
  //select div containing svg
  this.node = this.find('#perday');
  chartData = Stats.find({timestamp: {$gte: new Date().lastHours(1)}}).fetch();

  var length = chartData.length === 0 ? 1 : chartData.length;
  var width = 150;
  var height = 100;
  var barWidth = width / length;
  var barHeight = d3.max(chartData, function(d) { return d.count; });

  var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, barWidth]);
  var y = d3.scale.linear()
    .domain([1, barHeight])
    .rangeRound([0, 100]);

  var svg = d3.select(this.node)
    .attr("margin", width)
    .attr("width", width)
    .attr("height", height);
  svg.selectAll("rect")
      .data(chartData)
    .enter().append("rect")
      .attr("x", function(d, i) { return x(i) + .5; })
      .attr("y", function(d) { return height - y(d.count) - .5; })
      .attr("fill", '#676778')
      .attr("width", barWidth)
      .attr("height", function(d) { return y(d.count) < 0 ? 0 : y(d.count); });
  //axis
  svg.append("line")
    .attr("x1", 0)
    .attr("x2", barWidth * length)
    .attr("y1", height - 0.5)
    .attr("y2", height - 0.5)
    .style("stroke", "#EEE");
};

//setup an observe on the subscription, this should be updated every minute based on server push
Stats.find({timestamp: {$gte: new Date().lastHours(1)}}).observe({
  added: function(id, document) {
    //push off oldest data
    chartData.shift();
    //add new data
    chartData.push(document);
    //transition graph using d3
    redraw();
  }
});

function redraw() {

}
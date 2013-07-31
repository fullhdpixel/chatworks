GraphArea = function(node) {
  this.node = node;
  this.margin = {top: 20, right: 90, bottom: 90, left: 90};
  this.realWidth = $(this.node).width();
  this.realHeight = $(this.node).height();
  this.width = this.realWidth - this.margin.right - this.margin.left;
  this.height = this.realHeight - this.margin.top - this.margin.bottom;
  this.colors = d3.scale.category20();
};

_.extend(GraphArea.prototype, {
  createSvg: function() {
    this.svg = d3.select(this.node)
      .append('svg')
      .attr('margin', '20')
      .attr('width', this.realWidth)
      .attr('height', this.realHeight);
    this.xAxis = this.svg.append('g')
      .attr('id', 'xAxis');
    this.yAxis = this.svg.append('g')
      .attr('id', 'yAxis');
    return this;
  },
  setData: function(data) {
    this.length = data.length === 0 ? 1 : data.length;
    this.data = data;
    return this;
  },
  setXScale: function() {
    this.xScale = d3.scale.linear()
      .domain(d3.extent(this.data, function(d, i) { return i }))
      .range([this.margin.left, this.width]);
    return this;
  },
  setYScale: function() {
    this.yScale = d3.scale.linear()
      .domain([0, d3.max(this.data, function(d) { return d.count })])
      .range([this.height, 0+this.margin.top]);
    return this;
  },
  drawXAxis: function() {
    var self = this;
    var formatTick = function(d, i) {
      return self.data[i].handle;
    };
    this.xAxis = this.svg.select('#xAxis')
      .attr('transform', 'translate(0, ' + this.height + ')')
      .style('shape-rendering', 'crispEdges')
      .call(d3.svg.axis()
        .scale(this.xScale)
        .tickFormat(formatTick)
        .ticks(this.data.length)
        .orient('bottom'));
    this.xAxis.selectAll('text')
      .attr('fill', '#434343')
      .attr('text-anchor', 'end' )
      .style('stroke', 'none')
      .attr('transform', 'rotate(-65),translate(-25,0)');
    return this;
  },
  drawYAxis: function() {
    this.yAxis = this.svg.select("#yAxis")
      .attr('transform', 'translate(' + this.margin.left + ', 0)')
      .style('shape-rendering', 'crispEdges')
      .call(d3.svg.axis()
        .scale(this.yScale)
        .orient('left'));
    return this;
  },
  drawGroups: function() {
    this.groups = this.svg.selectAll('g.bar').data(this.data);
    this.group = this.updateGroups(this.groups.enter().append('g'));
    this.updateGroups(this.groups.transition().duration(250).ease('cubic-out'));
    this.groups.exit().transition().duration(250).attr('height', 0).remove();
    return this;
  },
  updateGroups: function(group) {
    var self = this;
    group
      .attr('class', 'bar')
      .attr('transform', function(d, i) { return 'translate('+self.xScale(i)+','+self.yScale(Math.max(0, d.count))+')' });
    group.append('rect')
      .attr('data-id', function (d) { return d.handle })
      .attr('fill', function(d) { return self.colors(d.handle) })
      .attr('width', (this.width/this.data.length)-5)
      .attr('height', function(d) { return Math.abs(self.yScale(d.count) - self.yScale(0)) });
    group.append('text')
      .attr('class', 'label')
      .attr('dx', (this.width/this.data.length)-10)
      .attr('dy', '1em')
      .attr('fill', 'white')
      .attr('text-anchor', 'end' )
      .text(function(d) { return d.count } );
    return this;
  },
  go: function() {
    this.setXScale().setYScale().drawXAxis().drawYAxis().drawGroups();
  }
});
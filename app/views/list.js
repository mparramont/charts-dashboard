var ListView = Backbone.View.extend({
  el: $('.content'), // el attaches to existing element
  events: {
    'click button#add': 'addChart'
  },
  initialize: function(){
    _.bindAll(this, 'render', 'addChart', 'appendChart');
    
    var chart1 = new Chart();
    var chart2 = new Chart();
    var chart3 = new Chart();
    var chart4 = new Chart();      

    this.collection = new List([chart1, chart2, chart3, chart4]);
    this.collection.bind('add', this.appendChart); // collection event binder

    this.render();
  },
  render: function(){
    var self = this;
    $(this.el).append("<button id='add'>Add another chart</button>");
    $(this.el).append("<div class='charts'></div>");
    _(this.collection.models).each(function(chart){
      self.appendChart(chart);
    }, this);
  },
  addChart: function(){
    var chart = new Chart();
    this.collection.add(chart);
  },
  appendChart: function(chart){
    var chartView = new ChartView({
      model: chart
    });
    $('.charts', this.el).append(chartView.render().el);
  }
});
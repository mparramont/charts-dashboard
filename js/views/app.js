var AppView = Backbone.View.extend({
  el: '.content',

  type_template: _.template($('#type-template').html()),
  filter_template: _.template($('#filter-template').html()),

  events: {
    'click button#add': 'addChart'
  },

  initialize: function(){
    _.bindAll(this, 'render', 'addChart', 'appendChart', 'filterAll');

    this.$title_input = this.$('#title');
    this.$type_input = this.$('#type');

    var chart1 = new Chart({title: 'An Area Chart', type: 'AreaChart'});
    var chart2 = new Chart({title: 'A Bar Chart', type: 'BarChart'});
    var chart3 = new Chart({title: 'A Column Chart', type: 'ColumnChart'});
    var chart4 = new Chart({title: 'A Line Chart', type: 'LineChart'});

    this.collection = new Charts([chart1, chart2, chart3, chart4]);
    this.collection.bind('add', this.appendChart);

    this.listenTo(this.collection, 'filter', this.filterAll);

    this.render();
  },

  render: function(){

    // fill type select with types from collection
    _(this.collection.types).each(function(type){
      var text = type.replace(/([A-Z]+)*([A-Z][a-z])/g,"$1 $2");//readable name
      $('#type', this.$el).append(this.type_template({
        value: type,
        text: text
      }));
    }, this);

    // do the same with the filters
    _(['AllChart'].concat(this.collection.types)).each(function(type){
      var text = type.replace(/([A-Z]+)*([A-Z][a-z])/g,"$1 $2");
      $('.filters ul', this.$el).append(this.filter_template({
        link: type + 's',
        text: text + 's'
      }));
    }, this);

    // bold 'All Charts' filter link
    this.$('.filters li a[href="#/AllCharts"]').addClass('selected');


    // render charts
    _(this.collection.models).each(function(chart){
      this.appendChart(chart);
    }, this);
  },

  addChart: function(){
    var chart = new Chart({
      title: this.$title_input.val().trim() || null, // use default if empty
      type: this.$type_input.val()
    });
    this.collection.add(chart);

    this.$title_input.val(''); //reset input
  },

  appendChart: function(chart){
    var chartView = new ChartView({model: chart });
    var chart_elem = chartView.render().el;
    $('.charts', this.$el).append(chart_elem);

    chart_elem.scrollIntoView(false); // scroll to chart, align to bottom
    $(chart_elem).effect("highlight", {}, 1500); // nifty yellow highlight fx
  },

  filterAll: function(filter){
    // bold out selected filter link
    this.$('.filters li a')
      .removeClass('selected')
      .filter('[href="#/' + ( app.filter || '' ) + 's"]')
      .addClass('selected');

    // trigger visibility for each model
    _(this.collection.models).each(function(chart){
      chart.trigger('visible');
    }, this);
  }
  
});

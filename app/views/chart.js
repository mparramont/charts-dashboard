var ChartView = Backbone.View.extend({
  tagName: 'div',

  template: _.template($('#chart-template').html()),

  events: { 
    'click span.delete': 'remove'
  },    
  
  initialize: function(){
    _.bindAll(this, 'render', 'unrender', 'remove');

    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },
  
  render: function(){
    //render the chart template
    this.$el.attr('class','chart').html(this.template(this.model.toJSON()));

    //render the chart itself using the Google Charts API
    var type = this.model.get('type');
    var data = this.model.get('data');
    var chart_container = this.$el.find('.chart-contents').get(0);
    var chart = new google.visualization[type](chart_container);
    chart.draw(data, {width: 396, height: 280});

    return this;
  },

  unrender: function(){
    this.$el.remove();
  },
  
  remove: function(){
    this.model.destroy();
  }
});
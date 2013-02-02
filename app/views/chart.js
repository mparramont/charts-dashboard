var ChartView = Backbone.View.extend({
  tagName: 'div',

  template: _.template($('#chart-template').html()),

  // `ChartView`s now respond to two clickable actions for each `Chart`: swap and delete.
  events: { 
    'click span.swap':  'swap',
    'click span.delete': 'remove'
  },    
  // `initialize()` now binds model change/removal to the corresponding handlers below.
  initialize: function(){
    _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here

    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },
  // `render()` now includes two extra `span`s corresponding to the actions swap and delete.
  render: function(){
    this.$el.attr('class','chart').html(this.template(this.model.toJSON()));

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);

    var chart = new google.visualization.PieChart(this.$el.find('.chart-contents').get(0));
    chart.draw(data, {width: 476, height: 330});

    return this;
  },
  // `unrender()`: Makes Model remove itself from the DOM.
  unrender: function(){
    this.$el.remove();
  },
  // `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
  remove: function(){
    this.model.destroy();
  }
});
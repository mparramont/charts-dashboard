/*google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(init);

function init() {
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

  var options = {'title':'How Much Pizza I Ate Last Night'};

  var chart1 = new google.visualization.PieChart(document.getElementById('chart_div1'));
  var chart2 = new google.visualization.PieChart(document.getElementById('chart_div2'));
  var chart3 = new google.visualization.PieChart(document.getElementById('chart_div3'));
  var chart4 = new google.visualization.PieChart(document.getElementById('chart_div4'));
  chart1.draw(data, options);
  chart2.draw(data, options);
  chart3.draw(data, options);
  chart4.draw(data, options);
}*/

(function($){
  // `Backbone.sync`: Overrides persistence storage with dummy function. This enables use of `Model.destroy()` without raising an error.
  Backbone.sync = function(method, model, success, error){ 
    success();
  }
  
  var Chart = Backbone.Model.extend({
    defaults: {
      title: 'New Chart'
    }
  });
  
  var List = Backbone.Collection.extend({
    model: Chart
  });

  var ChartView = Backbone.View.extend({
    tagName: 'li',
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
      $(this.el).html('<span>'+this.model.get('title')+'</span>');
      return this; // for chainable calls, like .render().el
    },
    // `unrender()`: Makes Model remove itself from the DOM.
    unrender: function(){
      $(this.el).remove();
    },
    // `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
    remove: function(){
      this.model.destroy();
    }
  });
  
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
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(chart){ // in case collection is not empty
        self.appendChart(chart);
      }, this);
      $(this.el).append("<button id='add'>Add another chart</button>");      
    },
    addChart: function(){
      var chart = new Chart();
      this.collection.add(chart);
    },
    appendChart: function(chart){
      var chartView = new ChartView({
        model: chart
      });
      $('ul', this.el).append(chartView.render().el);
    }
  });

  listView = new ListView();
})(jQuery);
var Chart = Backbone.Model.extend({
  defaults: {
    title: 'New Chart',
    type:  'AreaChart'
  },

  initialize: function(){
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2004',  1000,      400],
        ['2005',  1170,      460],
        ['2006',  660,       1120],
        ['2007',  1030,      540]
      ]);
    this.set({data: data});
  }
});
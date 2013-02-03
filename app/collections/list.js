var List = Backbone.Collection.extend({
  model: Chart,
  types: ['AreaChart', 'BarChart', 'ColumnChart', 'LineChart']
});
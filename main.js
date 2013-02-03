// `Backbone.sync`: Overrides persistence storage with dummy function. This enables use of `Model.destroy()` without raising an error.
Backbone.sync = function(method, model, success, error){ 
  success();
}

google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(init);

function init(){
  listView = new ListView();
}
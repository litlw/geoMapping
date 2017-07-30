app.directive("miniView", function(){
  return {
    restrict : 'E',
    templateUrl : '../modules/miniview/miniview.template.html',
    scope: {
      info: "="
    }
  }

})

app.directive("timelineView", function(){
  return {
    restrict : 'E',
    templateUrl : '../modules/timeline/timelineView.template.html',
    scope: {
      info: "="
    }
  }

})

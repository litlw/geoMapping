app.directive("mapView", function(){
  return {
    restrict : 'E',
    templateUrl : '../modules/map/mapView.template.html',
    scope: {
      info: "="
    }
  }

})

app.directive("myMapMaker", function(){
  return {
    restrict: 'E',
    // template: "Yo Yo",
    templateUrl: "js/directives/map_directive.html",
    scope: {
      src: "="
    }
  }
})

app.directive("controlView", function(){
  return {
    restrict : 'E',
    scope : {
      info : "="
    },
    templateUrl : "../modules/controller/controlView.template.html"  
  }

})

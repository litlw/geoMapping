app.controller("mainController", function($scope){
  $scope.title="Geo Mapping Tool"
  $scope.data = {
    maps: {
      nyc: "src/NewYorkbyNeighbourhood.js",
      toronto: "src/toronto_geoJSON.js"
    },
    data: {
      locations: "",
      output: ""
    }
  }
  $scope.make_map = function(target){
    //console.log("lets make a map")
    console.log("the target is " + target);
    return function(target){
      return mapMaker(target)
    }
  }
  $scope.click = function(){
    console.log("clicked")
  }
})
app.factory("viewManager", ["miniMap", "mapMaker", function(miniMap, mapMaker){
  // this returns the functions that I will be using. 
}])

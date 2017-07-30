app.controller("mapController", ['$scope', 'mapMaker', function($scope, mapMaker){
  $scope.title="my page"
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
    mapMaker(target)
  }
  $scope.title="boop"
  $scope.click = function(){
    console.log("clicked")
  }
}])

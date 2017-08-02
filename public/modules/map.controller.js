app.controller("mapController", ['$scope', 'mapMaker','importData', 'timeLine',
function($scope, mapMaker, importData, timeLine){
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
  $scope.table = function(){
    state = importData.return();
    if(document.getElementById('miniView_title').innerHTML != ""){
      return true;
      console.log("true");
    } else {
      return false;
      console.log("false");
    }
  }
  $scope.timeline = function(){
    timeLine();
  }
}])

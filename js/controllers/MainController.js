//This is only the main controller. the other controllers can be found in the modules section.

app.controller("mainController", function($scope) {
  // this is where you will find global variables and controllers.

  $scope.locations = [{
    name: "Toronto",
    src: "src/toronto_geoJSON.js",
    data_sources: [] //some source here
  },{
    name: "New York",
    src: "src/NewYorkbyNeighbourhood.js",
    data_sources: [{
      name: "All Outputs",
      src: "src/output.csv"
    }, {
      name: "Dropoff Outputs",
      src: "src/output_dropoffs.csv"
    },{
      name: "Source Data",
      src: "src/locations.csv"
    }] //some source here
  }];
$scope.helloWorld = "Hello World.";
});

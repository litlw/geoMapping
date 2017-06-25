app.controller("map_controller", function($scope){
  $scope.hello = "Hello World!"
  $scope.mapFunction1 = function(){
    d3.json(newYorkm, function(){


    var w = 1700;
    var h = 900;
    var x_fix = -1500;
    var y_fix = -450;
    var centered;
    var active;

      //Define map projection
      // anything to do with chaning map view belongs here.
      var projection = d3.geoMercator()
        .translate([w / 2, h / 2])
        .fitSize([3900, 1900], nyc);
      var path = d3.geoPath(projection);

      //Create SVG element
      var svg = d3.select("#vis1")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
      for (k in nyc.features) {
        nyc.features[k].count = 0;
        nyc.features[k].id=k;
      }

      //Bind data and create one path per GeoJSON feature



      // include the tsv stuff.
      d3.tsv("data/locations.tsv", function(data) {
        d3.csv("data/output.csv", function(pts) {
          data.forEach(function(d) {
            d.x = +d["pickup_longitude"];
            d.y = +d["pickup_latitude"];
            d.x_off = +d["dropoff_longitude"];
            d.y_off = +d["dropoff_latitude"]
            d.off = 0;
            d.loc = [d.x, d.y];
            d.loc_off = [d.x_off, d.y_off];
            d.count = +d["passenger_count"];


          })

          pts.forEach(function(d) {
            d.choropleth = d.location;
            //console.log(d.choropleth)
            for (k in nyc.features) {
              var name = nyc.features[k]["properties"]["neighborhood"];
              if (d.location == name) {
                nyc.features[k].count++;
              }
            }
          });

          var pickups = svg.append("g")
            .selectAll("circle")
            .data(data).enter()
            .append("circle")
            .attr("cx", function(d) {
              return (projection(d.loc)[0]);
            })
            .attr("cy", function(d) {
              return (projection(d.loc)[1]);
            })
            .attr("r", "3px")
            .attr("fill", function(d) {
              var b = 10 * d.count;
              var g = 0;
              var r = 250 / d.count;
              var a = 0.5;
              //return ("rgba(" + r + "," + g + "," + b + "," + a + ")");
              return ("none")
            })
            .on("hover", function(d) {
              d.off = 1;
            })
            .attr("transform", "translate(" + x_fix + ", " + y_fix + ")");

          var g = svg.append("g")
            .attr("class", "blocks")
            .selectAll("path")
            .data(nyc.features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", function(d) {
              count = d.count;
              if (count == 0) {
                return ("#fff");
              } else if (count < 10) {
                return ("#FDDFDF");
              } else if (count < 35) {
                return ("#F7A9A9");
              } else if (count < 55) {
                return ("#FD5B5B");
              } else {
                return ("#FF0000")
              }

            })
            .style("stroke", "#222")
            .attr("transform", "translate(" + x_fix + ", " + y_fix + ")")
            .on("click", function(d){
              var n = d;
              get_Location(n, nyc)
            });
        })
      });

  });
}
});

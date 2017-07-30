app.factory('d3', function(){
  return function(){
    console.log("d3 factory");
  }
});
app.factory('miniMap', [function(){
  return function(id){
    d3.selectAll("#miniView>svg").remove();
    console.log('miniMap started with id ' + id);
    d3.json("src/toronto_geoJSON.json", function(nyc){
      var w = 350;
      var h = 250;
      var scale = 170000;
      var centered;
      var active;

        var center = d3.geoCentroid(nyc.features[id])
        var projection = d3.geoMercator()
          .center(center)
          .scale(scale)
        var path = d3.geoPath(projection);
        var svg = d3.select('#miniView')
          .append("svg")
          .attr("width", w)
          .attr("height", h);

        var g = svg.append("g")
          .selectAll("path")
          .data(nyc.features)
          .enter()
          .filter(function(d, i){
            return i == id;
          }).append('path')

        g.attr("d", path)
          .attr("class", "blocks")
          .attr("id", function(d) {
            return ("a" + d.id)
          }).on("click", function(d){
            return miniMap(d.id);
          }).style("fill", function(){
            return "#e0e0ef"
          }).attr('transform', 'translate(-350, -100)')

    });
  }
}])

///// factory 2

app.factory("mapMaker", ['miniMap', function(miniMap){
  return function(target){
    console.log("inside mapMaker")
    d3.json("src/toronto_geoJSON.json", function(nyc) {
        var w = 700;
        var h = 500;
        var scale = 170000;
        var centered;
        var active;

          var center = d3.geoCentroid(nyc);
          //Define map projection
          // anything to do with chaning map view belongs here.
          var projection = d3.geoMercator()
            .center(center)
            .scale(scale)
          var path = d3.geoPath(projection);
          var drag = d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
          var zoom = d3.zoom()
            .scaleExtent([1, 10])
            .on('zoom', zoomed);
          var svg = d3.select('#' + target)
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .call(zoom)
            ;

          for (k in nyc.features) {
            nyc.features[k].count = 0;
            nyc.features[k].id = k;
          }

          var selection = svg.append("g")
          var g = selection.selectAll("path")
            .data(nyc.features)
            .enter()

            ;

          g.append("path")
            .attr("d", path)
            .attr("class", "blocks")
            .attr("id", function(d) {
              return ("a" + d.id)
            })
            .on("click", function(d, i){
              d3.selectAll(".blocks")
                .style("fill", function(){
                  return ("#fff")
                })
                d3.select(this)
                .style("fill", function(){
                  return ("#f00")
                });
              return miniMap(i);
            })
            .style("fill", function(d, i) {
              count = 0;
              if (count < 5) {
                return ("#fff");
              } else if (count < 20) {
                return ("#FDDFDF");
              } else if (count < 35) {
                return ("#F7A9A9");
              } else if (count < 50) {
                return ("#FD5B5B");
              } else {
                return ("#FF0000")
              }
            });


        function dragstarted(d) {
          d3.select(this).raise().classed("active", true);
        }

        function dragged(d) {
          console.log('dragged');
          var x, y;
          var qx = d3.event.x;
          var qy = d3.event.y;
          d3.select(this)
              .attr("transform", "translate(" + (x + -qx) + ',' + (y + -qy) + ")")
              .transition();
              // .attr("x", dx)
              // .attr("y", dy)
          x = qx;
          y = qy;
        }

        function dragended(d) {
          d3.select(this).classed("active", false);
        }
        function zoomed (d) {
          selection.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }


        });















  }
}])

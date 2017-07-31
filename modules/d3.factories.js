

                      //////////////////
                      // D3 FACTORIES //
                      //////////////////


////////////////////
// miniMap

app.factory('miniMap', [function() {
  var w = 350;
  var h = 250;
  var scale = 170000;
  var centered;
  var active;
  return  function(id){
      d3.selectAll("#miniViewMap>svg").remove();
      console.log('miniMap started with id ' + id);
      d3.json("src/toronto_geoJSON.json", function(nyc) {
        var center = d3.geoCentroid(nyc.features[id])
        var projection = d3.geoMercator()
          .center(center)
          .scale(scale)
        var path = d3.geoPath(projection);
        var svg = d3.select('#miniViewMap')
          .append("svg")
          .attr("width", w)
          .attr("height", h);

        var g = svg.append("g")
          .selectAll("path")
          .data(nyc.features)
          .enter()
          .filter(function(d, i) {
            return i == id;
          }).append('path');

        g.attr("d", path)
          .attr("class", "blocks")
          .attr("id", function(d) {
            return ("a" + d.id)
          }).style("fill", function() {
            return "#e0e0ef"
          }).attr('transform', 'translate(-350, -100)')

      });
    }

}])

///// end of miniMap

////////////////////
// mapMaker

app.factory("mapMaker", ['miniMap', 'importData',
  function(miniMap, importData) {

  return function(target) {
      console.log("inside mapMaker")
      d3.json("src/toronto_geoJSON.json", function(nyc) {
        //////////////////
        // VARIABLES
        var w = 800;
        var h = 700;
        var scale = 100000;
        ///////////////////
        // BEHAVIOURS
        var drag = d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended);
        var zoom = d3.zoom()
          .scaleExtent([1, 10])
          .on('zoom', zoomed);
        //////////////////
        // AGGREGATOR
        for (k in nyc.features) {
          nyc.features[k].count = 0;
          nyc.features[k].id = k;
        }
        //////////////////
        // PARAMETERS
        var center = d3.geoCentroid(nyc);
        var projection = d3.geoMercator()
        .center(center)
        .scale(scale)
        var path = d3.geoPath(projection);
        var svg = d3.select('#' + target)
          .append("svg")
          .attr("width", w)
          .attr("height", h)
          .call(drag);
        var selection = svg.append("g")
        //////////////////
        // CONSTRUCTOR
        var g = selection.selectAll("path")
          .data(nyc.features)
          .enter();
        g.append("path")
          .attr("d", path)
          .attr("class", "blocks")
          .attr("id", function(d) {
            return ("a" + d.id)
          })
          .on("click", function(d, i) {
            d3.selectAll(".blocks")
              .style("fill", function() {
                return ("#fff")
              })
            d3.select(this)
              .style("fill", function() {
                return ("#f00")
              });
            miniMap(i);
            importData.port(d);
            importData.return();
          })
          .style("fill", function(d, i) {
            return("#fff");
          });

        /////////////////////
        // BEHAVIOUR FUNCTIONS
        function dragstarted(d) {
          d3.select(this).raise().classed("active", true);
        }
        function dragged(d) {
          console.log('dragged');
          var x, y;
          var qx = d3.event.x - 400;
          var qy = d3.event.y - 350;
          d3.select(this)
            .attr("transform", "translate(" + (qx) + ',' + (qy) + ")")
            .transition();
          // .attr("x", dx)
          // .attr("y", dy)
          x = qx;
          y = qy;
        }
        function dragended(d) {
          d3.select(this).classed("active", false);
        }
        function zoomed(d) {
          selection.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
      });
  }
}]);

////// END OF mapMaker

////////////////////
// importData

app.factory("importData", [function(){
  var datum;
  return {
    port: function(d){
          datum  = d;
          target = document.getElementById('miniView_title')
          target.innerHTML = d.properties['HOOD']
          },
    return: function(){
      if(datum){
        return true;
        console.log("tru")
      } else {
        return false
      }
    }
}


}]);
/////// END OF importData

//////////////////////
// timeLine

app.factory("timeLine", [function(){
  return function(){
  	var margin = {top: 40, right: 20, bottom: 30, left: 100},
      width = 2000 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

  //var formatPercent = d3.format(".0%");

  var x = d3.scaleOrdinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      //.tickFormat(formatPercent);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>Funding:</strong> <span style='color:#F73D4E'>"+"$" + Math.floor(d.funding) + "</span>" + " million";
    })

  var svg = d3.select("#timeLine").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  d3.csv("../src/fake_data.csv", type, function(error, data) {
    x.domain(data.map(function(d, i) { return i; }));
    y.domain([0, d3.max(data, function(d) { return d.cost; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .on('click', hideYears);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .on('click', hideYears)

      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Funding (million $)")
        .on('click', hideYears);

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("id", function(d) { return String(d.year); })
        .attr("x", function(d) { return x(d.year); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.funding); })
        .attr("height", function(d) { return height - y(d.funding); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .on('click', GoTo);
  });

}}])

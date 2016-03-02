var width = 1000,
    height = 1000;

// set projection
var projection = d3.geo.mercator();

// create path variable
var path = d3.geo.path()
    .projection(projection);


d3.json("https://raw.githubusercontent.com/stamen/ecoengine/master/prototypes/covis/us.json", function(error, topo) { console.log(topo);

  	states = topojson.feature(topo, topo.objects.states).features

  	// set projection parameters
  	projection
      .scale(1200)
      .center([-80, 37.5])
	  

    // create svg variable
    var svg = d3.select("body").append("svg")
    				.attr("width", width)
    				.attr("height", height);

    // points
    aa = [-84.387982, 33.748995];
	bb = [-84.387982, 33.748995];

	console.log(projection(aa),projection(bb));

	// add states from topojson
	svg.selectAll("path")
      .data(states).enter()
      .append("path")
      .attr("class", "feature")
      .style("fill", "black")
      .attr("d", path);

    // put boarder around states 
  	svg.append("path")
      .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "mesh")
      .attr("d", path);

    // add circles to svg
    svg.selectAll("circle")
		.data([aa,bb]).enter()
		.append("circle")
		.attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
		.attr("cy", function (d) { return projection(d)[1]; })
		.attr("r", "8px")
		.attr("fill", "red")

});



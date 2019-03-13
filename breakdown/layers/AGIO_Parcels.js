d3.forceExtent = function(extent) {
    var nodes;

    if (extent == null) extent=[[0,800], [0,500]];

    function force() {
        var i,
            n = nodes.length,
            node,
            r = 0;

        for (i = 0; i < n; ++i) {
            node = nodes[i];
            r = (node.radius || 0);
            node.x = Math.max(Math.min(node.x, extent[0][1]-r), extent[0][0]+r);
            node.y = Math.max(Math.min(node.y, extent[1][1]-r), extent[1][0]+r);
        }
    }

    force.initialize = function(_) { nodes = _; };

    force.extent = function(_) {
        return arguments.length ? (extent = _, force) : extent;
    };

    return force;
};




/* Parcels Layer */
function onEach_parcel (feature, layer) {
  layer.on({
    click: function (e) {
      $("#feature_modal").modal("show");
      $('#feature_modal_body').html("");
      $('#feature_modal_title').html(feature.properties.parcel_id);
      var margin = { top: 50, right: 50, bottom: 50, left: 50 };

      var width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var svg = d3.select("#feature_modal_body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var noOfCirclesA = feature.properties.land_val / 100;
        noOfCirclesB = feature.properties.assess_val / 100;

      var aPos = width / 7;
          bPos = width - width / 4;

      var te = d3.easeBounce;

      var radius = 15;

      var dataA = d3.range(noOfCirclesA);
      dataA = dataA.map(function(d) {
        return {
          id: d
        }
      });

      var dataB = d3.range(noOfCirclesB);
      dataB = dataB.map(function(d) {
        return {
          id: d
        }
      });

      var extent = [[0, width], [0, height]];

      var simulationA = d3.forceSimulation(dataA)
        .force("x", d3.forceX(aPos))
        .force("y", d3.forceY(height))
        .force("extent", d3.forceExtent(extent))
        .force("collide", d3.forceCollide(radius + 2))
        .stop();

      var simulationB = d3.forceSimulation(dataB)
        .force("x", d3.forceX(bPos))
        .force("y", d3.forceY(height))
        .force("extent", d3.forceExtent(extent))
        .force("collide", d3.forceCollide(radius + 2))
        .stop();

      for (var i = 0; i < 120; ++i) simulationA.tick();
      for (var i = 0; i < 120; ++i) simulationB.tick();

      var counterA = 0,
          counterB = 0;

      var legendA = svg.append("g")
        .append("text")
        .attr("class", "counter")
        .attr("x", aPos)
        .attr("text-anchor", "middle")
        .text("Land Value");

      var legendB = svg.append("g")
        .append("text")
        .attr("class", "counter")
        .attr("x", bPos)
        .attr("text-anchor", "middle")
        .text("Assessed Value");

      function increment(pile) {
        if (pile === "a") {
          counterA++;
          legendA.text(counterA);
        } else {
          counterB++;
          legendB.text(counterB);
        }
      }

      addCircles(dataA, "a");
      addCircles(dataB, "b");

      function addCircles(data, pile) {

        var circle = svg.append("g")
          .attr("class", "circles")
          .selectAll("g").data(data)
        .enter().append("g")
          .attr("transform", function(d) {
            return "translate(" + d.x + "," + (-margin.top - radius * 2) + ")"
          });

        circle.append("circle")
          .attr("r", radius)
        circle.append("text")
          .attr("class", "coin-text")
          .attr("text-anchor", "middle")
          .attr("dy", radius / 3)
          .text("$100");

        circle.transition()
          .duration(750)
          .delay(function(d, i) {
            return (height - d.y) * 20;
          })
          .ease(te)
          .attr("transform", function(d) {
            return "translate(" + d.x + ", " +  d.y + ")";
          })
          .on("end", function() {
            increment(pile);
          });
      }
    }
  })
};

map.createPane('pane_parcels');
//map.getPane('pane_parcels').style['mix-blend-mode'] = 'normal';
var parcels = L.esri.featureLayer({
  url: 'https://gis.arkansas.gov/arcgis/rest/services/FEATURESERVICES/Planning_Cadastre/FeatureServer/6',
  simplifyFactor: 0.35,
  precision: 5,
  fields: ['OBJECTID',
          'parcel_id',
          'ow_name',
          'assess_val',
          'land_val',
          'ph_add'],
  pane: 'pane_parcels',
  minZoom: 16,
  style: {
    color: '#A9A9A9',
    weight: 1,
  },
  onEachFeature: onEach_parcel

});

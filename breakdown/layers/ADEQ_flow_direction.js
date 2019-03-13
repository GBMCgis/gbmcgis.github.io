/* ADEQ Flow Direction Layer */
map.createPane('flow_direction');
map.getPane('flow_direction').style['mix-blend-mode'] = 'normal';
var multiCoords1 = [];
function onEach_flow_direction(feature, layer) {
  layer.on({
    click: function (e) {
      var feature_table_header = "<table id='feature_table' class='cell-border compact stripe hover'>"+
        "<thead><tr>"+
            "<th>COMID</th>"+
            "<th>FDATE</th>"+
            "<th>Length (km)</th>"+
            "<th>Reach Code</th>"+
            "<th>Feature Type</th>"+
            "<th>Feature Code</th>"+
            "<th>Flow Direction</th>"+
          "</tr></thead><tbody>"

      var feature_table_row = "<tr>" +
        "<td>"+ feature.properties.COMID + "</td>"+
        "<td>"+ feature.properties.FDATE + "</td>"+
        "<td>"+ feature.properties.LENGTHKM + "</td>"+
        "<td>"+ feature.properties.REACHCODE + "</td>"+
        "<td>"+ feature.properties.FTYPE_DESC + "</td>"+
        "<td>"+ feature.properties.FCODE_DESC + "</td>"+
        "<td>"+ feature.properties.FLOW_DIR + "</td>"+
        "</tr>"

      var feature_table = feature_table_header + feature_table_row + "</tbody></table>"


      $("#feature_modal").modal("show");
      $("#feature_modal_body").html(feature_table);
      $("#feature_modal_title").html(feature.properties.GNIS_ID + " : " + feature.properties.GNIS_NAME);
      $('#feature_table').DataTable({
        bPaginate: false,
        bFilter: false,
        bInfo: false,
        bOrdering: false,
        bSorting: false
      });
    }
  })
  var coords = []
  var i;
  for (i = 0; i < feature.geometry.coordinates.length; i++) {
    var lat = feature.geometry.coordinates[i][1]
    var lng = feature.geometry.coordinates[i][0]
    coords.push([lat, lng]);
  }
  var polyline = L.polyline(coords);
  var decorator = L.polylineDecorator(polyline, {
        patterns: [
            {offset: 25, repeat: 75, symbol: L.Symbol.arrowHead({pixelSize: 10, pathOptions: {fillOpacity: 1, weight: 0}})}
        ]
    }).addTo(map);
};

var flow_direction = L.esri.featureLayer({
  url: 'https://gis.adeq.state.ar.us/arcgis/rest/services/Flow_Direction/MapServer/0',
  fields: ['OBJECTID_1',
          'COMID',
          'FDATE',
          'GNIS_ID',
          'GNIS_NAME',
          'LENGTHKM',
          'REACHCODE',
          'FTYPE',
          'FCODE',
          'FTYPE_DESC',
          'FCODE_DESC',
          'FLOWDIR'],
  onEachFeature: onEach_flow_direction,
  simplifyFactor: 0.35,
  precision: 5,
  minZoom: 13,
  style: {
    //opacity: 0.0,
    color: '#A1CAF1'
  }
});

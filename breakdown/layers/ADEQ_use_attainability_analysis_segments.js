/* ADEQ Use Attainability Analysis Segments */
map.createPane('adeq_uaas');
map.getPane('adeq_uaas').style['mix-blend-mode'] = 'normal';

function onEach_adeq_uaas(feature, layer) {
  layer.on({
    click: function (e) {
      var feature_table_header = "<table id='feature_table' class='cell-border compact stripe hover'>"+
        "<thead><tr>"+
            "<th>Stds_Var</th>"+
            "<th>Use_Var</th>"+
            "<th>UAA Number</th>"+
          "</tr></thead><tbody>"

      var feature_table_row = "<tr>" +
        "<td>"+ feature.properties.Stds_Var + "</td>"+
        "<td>"+ feature.properties.Use_Var + "</td>"+
        "<td>"+ feature.properties.UAA_No + "</td>"+
        "</tr>"

      var feature_table = feature_table_header + feature_table_row + "</tbody></table>"


      $("#feature_modal").modal("show");
      $("#feature_modal_body").html(feature_table);
      $("#feature_modal_title").html(feature.properties.GNIS_NAME);
      $('#feature_table').DataTable({
        bPaginate: false,
        bFilter: false,
        bInfo: false,
        bOrdering: false,
        bSorting: false
      });
    }
  })
};

var adeq_uaas = L.esri.featureLayer({
  url: 'https://gis.adeq.state.ar.us/arcgis/rest/services/Environmental_Data/MapServer/25',
  fields: ['OBJECTID',
          'GNIS_NAME',
          'Stds_Var',
          'UAA_No',
          'Use_Var'],
  onEachFeature: onEach_adeq_uaas,
  simplifyFactor: 0.35,
  precision: 5
}).addTo(map);

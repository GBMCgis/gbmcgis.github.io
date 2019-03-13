map.createPane('pane_ardot_mitigation_sites');
map.getPane('pane_ardot_mitigation_sites').style['mix-blend-mode'] = 'normal';

function onEach_ardot_mitigation_sites(feature, layer) {
  layer.on({
    click: function (e) {
      var feature_table_header = "<table id='feature_table' class='cell-border compact stripe hover'>"+
        "<thead><tr>"+
            "<th>Source</th>"+
            "<th>Acres</th>"+
          "</tr></thead><tbody>"

      var feature_table_row = "<tr>" +
        "<td>"+ feature.properties.Source + "</td>"+
        "<td>"+ feature.properties.Acres + "</td>"+
        "</tr>"

      var feature_table = feature_table_header + feature_table_row + "</tbody></table>"

      $("#feature_modal").modal("show");
      $("#feature_modal_title").html(feature.properties.Name)
      $("#feature_modal_body").html(feature_table)
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

var ardot_mitigation_sites = L.esri.featureLayer({
  url: 'https://arc.arkansashighways.com/arcgis/rest/services/Mitigation_Sites/FeatureServer/0',
  fields: ['OBJECTID',
          'Name',
          'Source',
          'Acres'],
  style: {
    color: '#F3C300'
  },
  onEachFeature: onEach_ardot_mitigation_sites
}).addTo(map);

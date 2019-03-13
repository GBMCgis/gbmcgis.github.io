/* TMDL Limits Layer */
map.createPane('tmdl_limits');
map.getPane('tmdl_limits').style['mix-blend-mode'] = 'normal';

function onEach_tmdl_limits(feature, layer) {
  layer.on({
    click: function (e) {
      var feature_table_header = "<table id='feature_table' class='cell-border compact stripe hover'>"+
        "<thead><tr>"+
            "<th>Dissolved Oxygen</th>"+
            "<th>pH</th>"+
            "<th>Temperature</th>"+
            "<th>Silt / Turbidity</th>"+
            "<th>Chlorides</th>"+
            "<th>Sulfates</th>"+
            "<th>Total Dissolved Soilds</th>"+
            "<th>Copper</th>"+
            "<th>Lead</th>"+
            "<th>Zinc</th>"+
            "<th>Other</th>"+
          "</tr></thead><tbody>"

      var feature_table_row = "<tr>" +
        "<td>"+ feature.properties.Dis_Oxygen + "</td>"+
        "<td>"+ feature.properties.pH + "</td>"+
        "<td>"+ feature.properties.Temp + "</td>"+
        "<td>"+ feature.properties.Silt_Turb + "</td>"+
        "<td>"+ feature.properties.Chlorides + "</td>"+
        "<td>"+ feature.properties.Sulfates + "</td>"+
        "<td>"+ feature.properties.Tot_Dis_So + "</td>"+
        "<td>"+ feature.properties.Copper + "</td>"+
        "<td>"+ feature.properties.Lead + "</td>"+
        "<td>"+ feature.properties.Zinc + "</td>"+
        "<td>"+ feature.properties.Other + "</td>"+
        "</tr>"

      var feature_table = feature_table_header + feature_table_row + "</tbody></table>"


      $("#feature_modal").modal("show");
      $("#feature_modal_body").html(feature_table);
      $("#feature_modal_title").html(feature.properties.Stream_Nam);
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

var tmdl_limits = L.esri.featureLayer({
  url: 'https://gis.adeq.state.ar.us/arcgis/rest/services/EnviroView_Data/MapServer/29',
  fields: ['OBJECTID',
          'Stream_Nam',
          'Dis_Oxygen',
          'pH',
          'Temp',
          'Silt_Turb',
          'Chlorides',
          'Sulfates',
          'Tot_Dis_So',
          'Path_Ind',
          'Copper',
          'Lead',
          'Zinc',
          'Other'],
  onEachFeature: onEach_tmdl_limits,
  simplifyFactor: 0.35,
  precision: 5
}).addTo(map);



map.createPane('pane_wqstations');
map.getPane('pane_wqstations').style['mix-blend-mode'] = 'normal';
function onEach_wqstations(feature, layer) {
  layer.on({
    click: function (e) {
      var feature_table_header = "<table id='feature_table' class='cell-border compact stripe hover'>"+
        "<thead><tr>"+
            "<th>Description</th>"+
            "<th>Link</th>"+
          "</tr></thead><tbody>"

      var feature_table_row = "<tr>" +
        "<td>"+ feature.properties.Description + "</td>"+
        "<td><a href="+ feature.properties.WebData + ">View sampling results from ADEQ</a></td>"+
        "</tr>"

      var feature_table = feature_table_header + feature_table_row + "</tbody></table>"

      $("#feature_modal").modal("show");
      $("#feature_modal_title").html("<a href=" + feature.properties.WebData + ">" + feature.properties.Basin + "</a>")
      //$("#feature_modal_body").html("<div id='hidden'></div>")
      $('#feature_table').DataTable({
        bPaginate: false,
        bFilter: false,
        bInfo: false,
        bOrdering: false,
        bSorting: false
      });

      // Ajax call to load the station data into a bootstrap modal
      // using the Heroku CORS anywhere app
      $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/' + feature.properties.WebData,
        success: function(response){
          var footer = $(response).find("#greyTfootBox")
          if(!$('#greyTfootBox').length){
            $("#feature_modal_body").html("No Records Found")
          }
          $("#feature_modal_body").html(footer)
          // manipulate the returned string
          var records_found = (((((footer[0]["innerText"].split("\n", 1))[0].split(":", 2))[1]).replace(" ", "")).replace(",","")).trim()
          url = 'https://cors-anywhere.herokuapp.com/https://www.adeq.state.ar.us/techsvs/env_multi_lab/water_quality_station.aspx?t_stationid=' + feature.properties.Basin + "&RecordsPerPage=" + records_found
          //$("#feature_modal_body").empty();
          $("#feature_modal_body").html(records_found + " Records Found<br> Loading data...");
          $.ajax({
            url: url,
            success: function(response_two){
              var feature_modal_body = $(response_two).find("#tblGrid")
              $(feature_modal_body).find('#greyTfootBox').remove();
              $(feature_modal_body).find('input').remove();
              $(feature_modal_body).find('caption').remove();
              $(feature_modal_body).find('tfoot').remove();
              //$(feature_modal_body).find("input type='image'").remove();
              $("#feature_modal_body").html(feature_modal_body)

              $("#tblGrid").html(function (i, html) {
                  return html.replace(/  &nbsp;/g, '');
              });
              $("#tblGrid").html(function (i, html) {
                  return html.replace(/&nbsp;/g, '');
              });
              $("#tblGrid").html(function (i, html) {
                  return html.replace(/style="background-color:#E8E8E8"/g, '');
              });
              $("#tblGrid").html(function (i, html) {
                  return html.replace(/style="background-color:#FFFFFF"/g, '');
              });



          // Group Results by Date

          $(document).ready(function() {
            var groupColumn = 3;
            var d_table =  $('#tblGrid').DataTable({
                bPaginate: false,
                bInfo: false,
                bOrdering: false,
                bSorting: false,
                "columnDefs": [{
                  "visible": false,
                  "targets": groupColumn
                }],
                "order": [[ groupColumn, 'asc']],
                "displayLength": 25,
                "drawCallback": function (settings) {
                  var api = this.api();
                  var rows = api.rows({page: 'current'}).nodes();
                  var last = null;
                  api.column(groupColumn, {page:'curret'}).data().each( function (group, i){
                    if (last !== group) {
                      $(rows).eq( i ).before(
                        '<tr class="group"><td colspan="11">'+group+'</td></tr>'
                      );
                      last = group;
                    }
                  });
                }
              });
              // Order by the grouping
              $('#tblGrid tbody').on( 'click', 'tr.group', function () {
                  var currentOrder = table.order()[0];
                  if ( currentOrder[0] === groupColumn && currentOrder[1] === 'asc' ) {
                      table.order( [ groupColumn, 'desc' ] ).draw();
                  }
                  else {
                      table.order( [ groupColumn, 'asc' ] ).draw();
                  }
              } );
            } );


            /*
              var station =  d_table.columns([0]).data()[0];
              var description = d_table.columns([1]).data()[0];
              var lab_number = d_table.columns([2]).data()[0];
              var date = d_table.columns([3]).data()[0];
              var relative_depth = d_table.columns([4]).data()[0];
              var parameter = d_table.columns([5]).data()[0];
              var results = d_table.columns([6]).data()[0];
              var parameter_group = d_table.columns([7]).data()[0];
              var county = d_table.columns([8]).data()[0];
              var ecoregion = d_table.columns([9]).data()[0];
              var huc = d_table.columns([10]).data()[0];
              var planning_segment = d_table.columns([11]).data()[0];

              console.log(date)



              var hh = $("#feature_modal_body").css('height').replace("px", "");
              var ww = $("#feature_modal_body").css('width').replace("px", "");
              var margin = {top: 22, right: 20, bottom: 32, left: 52},
                  width = 800 - margin.left - margin.right,
                  height = 300 - margin.top - margin.bottom;

              // parse the date / time
              var parseTime = d3.timeParse("%d-%m-%Y %I:%M:%S %p");
              var formatTime = d3.timeFormat("%Y-%m-%d");

              // set the ranges
              var x = d3.scaleTime().range([6, width]);
              var y = d3.scaleLinear().range([height, 0]);

              // define the line
              //var valueline = d3.line()
              //    .x(function(d) { return x(d.date); })
              //    .y(function(d) { return y(d.close); });

              var div = d3.select("#feature_modal_body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

              // append the svg obgect to the body of the page
              // appends a 'group' element to 'svg'
              // moves the 'group' element to the top left margin
              var svg = d3.select("#feature_modal_body").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

              // Get the data
              var data = (function(d) { return {
                "date": parseTime(d.date),
                "close": parseFloat(d.results)
                }
              })

              console.log(data);

                // scale the range of the data
                x.domain(d3.extent(data, function(d) { return d.date; }));
                y.domain([0, d3.max(data, function(d) { return d.close; })]);

                // add the valueline path.
                //svg.append("path")
                //   .data([data])
                //   .attr("class", "line")
                //   .attr("d", valueline);

                // add the dots with tooltips
                svg.selectAll("dot")
                   .data(data)
                 .enter().append("circle")
                   .attr("r", 5)
                   .attr("cx", function(d) { return x(d.date); })
                   .attr("cy", function(d) { return y(d.close); })
                   .attr("id","scatterpoint")
                   .on("mouseover", function(d) {
                     div.transition()
                       .duration(200)
                       .style("opacity", .9);
                     div.html("Date:<b> " + formatTime(d.date) + "</b><br/>Result:<b> " + d.close +" </b>")
                       .style("left", (d3.event.pageX) + "px")
                       .style("top", (d3.event.pageY - 28) + "px");
                     })
                   .on("mouseout", function(d) {
                     div.transition()
                       .duration(500)
                       .style("opacity", 0);
                     });

               // add the X Axis
               svg.append("g")
                   .attr("transform", "translate(0," + height + ")")
                   .call(d3.axisBottom(x));

               // text label for the x axis
               svg.append("text")
                   .attr("transform",
                         "translate(" + (width/2) + " ," +
                                        (height + margin.top + 10) + ")")
                    .attr("id",'axistext')
                   .style("text-anchor", "middle")
                   .text("Date");

               // add the Y Axis
               svg.append("g")
                   .call(d3.axisLeft(y));

               // text label for the y axis
               svg.append("text")
                   .attr("transform", "rotate(-90)")
                   .attr("y", -5 - margin.left)
                   .attr("x",0 - (height / 2))
                   .attr("dy", "1em")
                   .attr("id",'axistext')
                   .style("text-anchor", "middle")
                   .text("Turbidity (NTU)");

                   */



            },//end ajax call two
            error: function(response_two){
              console.log('data obtain error');
            }
          })
        },
        error: function(response){
          console.log('bridge server error');
        }
      })//end ajax call one


    }//end on click function
  })//end layer.on
};//end onEachFeature



var wqstations = L.esri.featureLayer({
  url: 'https://gis.adeq.state.ar.us/arcgis/rest/services/AquaView_Data/MapServer/0',
  fields: ['OBJECTID',
          'WebData',
          'Title',
          'Basin',
          'Description'],
  onEachFeature: onEach_wqstations
});

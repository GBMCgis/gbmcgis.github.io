$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

/*
$("#full-extent-btn").click(function() {
  map.fitBounds(hgmwet.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});
*/

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});


function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

$(window).resize(function() {
  sizeLayerControl();
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$("#parcels").click(function() {
    if (map.hasLayer(parcels)) {
      parcels.remove(map);
      document.getElementById("parcels").style.backgroundColor = "transparent";
  } else {
    parcels.addTo(map);
    document.getElementById("parcels").style.backgroundColor = "lightblue";
  }
});

$("#wqms").click(function() {
    if (map.hasLayer(wqstations)) {
      wqstations.remove(map);
      document.getElementById("wqms").style.backgroundColor = "transparent";
  } else {
    wqstations.addTo(map);
    document.getElementById("wqms").style.backgroundColor = "lightblue";
  }
});
$("#flow_direction").click(function() {
    if (map.hasLayer(flow_direction)) {
      flow_direction.remove(map);
      document.getElementById("flow_direction").style.backgroundColor = "transparent";
  } else {
    flow_direction.addTo(map);
    document.getElementById("flow_direction").style.backgroundColor = "lightblue";
  }
});




var map = L.map('map').setView([34.7503929777651, -92.22739219665529], 14);

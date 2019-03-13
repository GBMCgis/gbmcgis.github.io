/* AGIO Geocoder*/
var agioGeocoder = window.L.esri.Geocoding.geocodeServiceProvider({
  url: 'https://gis.arkansas.gov/arcgis/rest/services/Locator/ASDI_Composite_Locator/GeocodeServer',
  label: 'AGIO Geocoder Results'
});

var parcel_geocoder = L.esri.Geocoding.featureLayerProvider({
      url: 'https://gis.arkansas.gov/arcgis/rest/services/FEATURESERVICES/Planning_Cadastre/FeatureServer/6',
      searchFields: 'ow_name',
      label: 'Parcels',
      bufferReadius: 50000,
      formatSuggestion: function(feature){
        return feature.properties.ow_name;
      }
    })

var wqms_geocoder = L.esri.Geocoding.featureLayerProvider({
      url: 'https://gis.adeq.state.ar.us/arcgis/rest/services/AquaView_Data/MapServer/0',
      searchFields: 'Basin',
      label: 'Water Quality Monitoring Station',
      bufferReadius: 0,
      formatSuggestion: function(feature){
        return feature.properties.Basin;
      }
    })

var searchControl = window.L.esri.Geocoding.geosearch({
  providers: [
    agioGeocoder,
    wqms_geocoder
  ],
  position: 'topleft',
  zoomToResult: true,
  useMapBounds: false,
  allowMultipleResults: false,
  expanded: true
}).addTo(map);


var htmlObject = searchControl.getContainer();
var a = document.getElementById('geocoder')
function setParent(el, newParent){
  newParent.appendChild(el);
}
setParent(htmlObject, a);

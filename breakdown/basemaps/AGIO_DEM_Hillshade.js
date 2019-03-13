///Hillshade DEM

//Hillshade
var renderingRule = {
  "rasterFunction":"Hillshade",
  "rasterFunctionArguments": {
    "Azimuth":315,
    "Altitude":45,
    "ZFactor":1
  },"variableName":"DEM"
};

//Slope
var renderingRuleTwo = {
  "rasterFunction" : "Slope",
  "rasterFunctionArguments" : {
    "ZFactor" : 0.3
  }
}

// Shaded Relief
var shaded_relief = {
  "rasterFunction" : "ShadedRelief",
  "rasterFunctionArguments" : {
    "Azimuth" : 215.0,
    "Altitude" : 75.0,
    "ZFactor" : 0.3,
    "Colormap" : [
      [1, 255, 0, 0],
      [2, 0, 255, 0],
      [3, 125, 25, 255]
    ],
  },
  "variableName" : "Raster"
}

// Elevation Color Map
var elevation_color_map = {
  "rasterFunction" : "Colormap",
  "rasterFunctionArguments" : {
    "ColormapName" : "Elevation"
  },
  "variableName" : "Raster"
}


// Elevation Color Map
var color_ramp = {
  "rasterFunction" : "Colormap",
  "rasterFunctionArguments" : {
    "ColorrampName" : "Blue Bright"
  }
}

var dem = L.esri.imageMapLayer({
  url: 'https://gis.arkansas.gov/arcgis/rest/services/ImageServices/DEM_1M_2018/ImageServer',
  renderingRule: color_ramp
});

// Identify Elevation
var identifiedPixel;
var pane = document.getElementById('pixelValue');

map.on('click', function (e) {
    if(identifiedPixel){
        pane.innerHTML = 'Loading';
    }
    dem.identify().at(e.latlng).run(function(error, results){
        identifiedPixel = results.pixel;
        pane.innerHTML = identifiedPixel.properties.value + 'm';
    });
});

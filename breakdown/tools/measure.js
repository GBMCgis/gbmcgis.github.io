


/// Measure tool
/*
options = {
  position: 'bottomright'
}
L.control.polylineMeasure(options).addTo(map);
*/

var measure_tool = L.control.polylineMeasure().addTo(map);

var htmlObject = measure_tool.getContainer();
var a = document.getElementById('measure')
function setParent(el, newParent){
  newParent.appendChild(el);
}
setParent(htmlObject, a);

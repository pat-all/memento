var excavation = field("Раскопка");
var description = "";

if (excavation.length > 0) {
  description = excavation[0].field("description");
} else {
  var from = 'от ' + field("От");
  var to = 'до ' + field("До");
  var start = field(from)[0].field("name");
  var end = field(to)[0].field("name");
  description = "От " + start + "-" + end;
}

description
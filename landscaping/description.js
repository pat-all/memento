var excavation = field("Раскопка");
var description = "";

if (excavation.length > 0) {
  description = excavation[0].field("description");
} else {
  var from = field("от " + field("От"))[0].field("name");
  var to = field("до " + field("До"))[0].field("name");
  description = "От " + from + "-" + to;
}

description
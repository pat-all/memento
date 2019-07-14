var excavation = field("Раскопка");
var description = "";
var from = "";
var to = "";
if (excavation.length > 0) {
  description = excavation[0].field("description");
} else {
  /*
  var from = 'от ' + field("От");
  var to = 'до ' + field("До");
  var start = field(from)[0].field("name");
  var end = field(to)[0].field("name");
  description = "От " + start + "-" + end;
  */
  switch (field("От")) {
    case "ТП":
      from = field("от ТП")[0].field("name");
      break;
    case "ТК":
      from = field("от ТК")[0].field("name");
      break;
    case "ж/д":
      from = field("от ж/д")[0].field("name");
      break;

    default:
      break;
  }

  switch (field("До")) {
    case "ТП":
      to = field("до ТП")[0].field("name");
      break;
    case "ТК":
      to = field("до ТК")[0].field("name");
      break;
    case "ж/д":
      to = field("до ж/д")[0].field("name");
      break;

    default:
      break;
  }

  description = from + " - " + to;
}

description;

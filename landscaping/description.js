var excavation = field("Раскопка");
var description = "";
var from = "";
var to = "";
if (excavation.length > 0) {
  description = excavation[0].field("description");
} else {
  switch (field("От")) {
    case "ТП":
      from = "ТП " + field("от ТП")[0].field("name");
      break;
    case "ТК":
      from = "ТК " + field("от ТК")[0].field("name");
      break;
    case "ж/д":
      from = "ж/д " + field("от ж/д")[0].field("name");
      break;

    default:
      break;
  }

  switch (field("До")) {
    case "ТП":
      to = "ТП " + field("до ТП")[0].field("name");
      break;
    case "ТК":
      to = "ТК " + field("до ТК")[0].field("name");
      break;
    case "ж/д":
      to = "ж/д " + field("до ж/д")[0].field("name");
      break;

    default:
      break;
  }

  description = from + " - " + to;
}

description;

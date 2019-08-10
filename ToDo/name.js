var type = field("Тип");
var name = "";

switch (type) {
  case "Другое":
    name = field("Другое");
    break;
  case "Дефекты": 
    var defectsCount = field("Дефекты").length;
    name = type + " [" + defectsCount + "]";
    break;
  default:
    name = type;
    break;
}

name;
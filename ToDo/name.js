var type = field("Тип");
var planed = field("Запланировать");
var planDate = field("Запланировано");
var name = "";

switch (type) {
  case "Монтировать насосы":
  case "Насосы на склад":
  case "Демонтировать насосы":
    var pumpsCount = field("Насосы").length;
    name = type + " [" + pumpsCount + "]";
    break;
  case "Другое":
    name = field("Другое");
    break;
  case "Дефекты": 
    var defectsCount = field("Дефекты").length;
    name = type + " [" + defectsCount + "]";
    break;
  case "Раскопка":
    var excavation = field("Раскопка")[0];
    name = type + ": " + excavation.field("name");
    break;
  case "Благоустройство":
    var landscaping = field("Благоустройство")[0];
    name = type + ": " + landscaping.field("name");
    break;
  case "Отключения":
    var shutdownsCount = field("Отключения").length;
    name = type + " [" + shutdownsCount + "]";
    break;
  default:
    name = type;
    break;
}

name;
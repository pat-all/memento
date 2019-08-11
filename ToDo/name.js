var type = field("Тип");
var planed = field("Запланировать");
var planDate = field("Запланировано");
var name = "";

function showCounter(counter){
  return " [" + counter + "]";
}

switch (type) {
  case "Монтировать насосы":
  case "Насосы на склад":
  case "Демонтировать насосы":
    var pumpsCount = field("Насосы").length;
    name = type + showCounter(pumpsCount);
    break;
  case "Другое":
    name = field("Другое");
    break;
  case "Дефекты": 
    var defectsCount = field("Дефекты").length;
    name = type + showCounter(defectsCount);
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
    name = type + showCounter(shutdownsCount);
    break;
  case "Плановые ремонты":
      var planedRepairsCount = field("Ремонты").length;
      name = type + showCounter(planedRepairsCount);    
    break;
  default:
    name = type;
    break;
}

name;
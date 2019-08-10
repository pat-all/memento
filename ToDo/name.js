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
  default:
    name = type;
    break;
}

if(planed){
  name = name + "\u1F4C5 " + planDate;
}

name;
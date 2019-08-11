var type = field("Тип");
var planed = field("Запланировать");
var planDate = field("Запланировано");
var name = "";

/**
 * 
 * @param {string} fieldName - name of a linked entry field [array of entries], which count you want to show.
 * @returns count in []
 */
function showCounter(fieldName){
  var counter = field(fieldName).length;
  return " [" + counter + "]";
}

/**
 * 
 * @param {string} fieldName - name of a linked entry field [array of entries] 
 * @returns the first entry "name".
 */
function showFirstEntryName(fieldName){
  return " :" + field(fieldName)[0].field("name");
}

switch (type) {
  case "Монтировать насосы":
  case "Насосы на склад":
  case "Демонтировать насосы":
    name = type + showCounter("Насосы");
    break;
  case "Другое":
    name = field("Другое");
    break;
  case "Дефекты": 
    name = type + showCounter("Дефекты");
    break;
  case "Раскопка":
    name = type + showFirstEntryName("Раскопка");
    break;
  case "Благоустройство":
    name = type + showFirstEntryName("Благоустройство");
    break;
  case "Отключения":
    name = type + showCounter("Отключения");
    break;
  case "Плановые ремонты":
      name = type + showCounter("Ремонты");    
    break;
  default:
    name = type;
    break;
}

name;
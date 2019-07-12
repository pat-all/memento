/**
 * Определяем дефект в зависимости от оборудования
 */

var equipmentType = field("Тип оборудования");
var defects = "";
var pipeTypes = [];
var defArr = [];

function arrToString(arr) {
  var resString = "";
  for (var i = 0; i < arr.length; i++) {
    if (i > 0) {
      resString = resString + ", " + arr[i];
    } else {
      resString = arr[i];
    }
  }
  return resString;
}

switch (equipmentType) {
  case "Насос":
    defArr = field("Дефекты насоса");
    defects = arrToString(defArr);
    break;
  case "Теплообменник":
    defArr = field("Дефекты теплообменника");
    defects = arrToString(defArr);
    break;
  case "Трубопровод":
    defects = "Тр/п: ";
    defArr = field("Тип трубопровода");
    defects = defects + arrToString(defArr);
    break;
  default:
}

defects;

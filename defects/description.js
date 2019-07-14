/**
 * Определяем дефект в зависимости от оборудования
 */

var equipmentType = field("Тип оборудования");
var description = "";
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
    description = arrToString(defArr);
    break;
  case "Теплообменник":
    defArr = field("Дефекты теплообменника");
    description = arrToString(defArr);
    break;
  case "Трубопровод":
    description = "Тр/п: ";
    defArr = field("Тип трубопровода");
    for (var i = 0; i < defArr.length; i++) {
      switch (defArr[i]) {
        case "ГВС":
          if (i > 0) {
            description =
              description +
              ", " +
              "ГВС: " +
              field("ДУ Подача ГВС") +
              "/" +
              field("ДУ Циркуляция ГВС");
          } else {
            description =
              description +
              "ГВС: " +
              field("ДУ Подача ГВС") +
              "/" +
              field("ДУ Циркуляция ГВС");
          }
          break;
        case "ЦО зав.":
          if (i > 0) {
            description =
              description + ", " + "ЦО зав.: " + field("ДУ ЦО зав.");
          } else {
            description = description + "ЦО зав.: " + field("ДУ ЦО зав.");
          }
          break;
        case "ЦО незав.":
          if (i > 0) {
            description =
              description + ", " + "ЦО незав.: " + field("ДУ ЦО незав.");
          } else {
            description = description + "ЦО незав.: " + field("ДУ ЦО незав.");
          }
          break;
        case "ХВС":
          if (i > 0) {
            description = description + ", " + "ХВС: " + field("ДУ ХВС");
          } else {
            description = description + "ХВС: " + field("ДУ ХВС");
          }
          break;

        default:
          break;
      }
    }
    break;
  default:
}

description;

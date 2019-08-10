var type = field("Тип");
var result = "";

switch (type) {
  case "Монтировать насосы":
  case "Насосы на склад":
  case "Демонтировать насосы":
    break;
  case "Дефекты":
    var defects = field("Дефекты");
    var defectsByLvl = {};
    for(var i = 0; i < defects.length; i++){
      var level = defects[i].field("Уровень");
      if(defectsByLvl[level] === undefined){
        defectsByLvl[level] = 1;
      } else {
        defectsByLvl[level] = defectsByLvl[level] + 1;
      }
    }
    for(var i = 5; i > 0; i--){
      if(defectsByLvl[i] !== undefined){
        if(result.length > 0){
          result = result + "\nУровень " + i + ": " + defectsByLvl[i] + " шт.;"
        } else {
          result = "Уровень " + i + ": " + defectsByLvl[i] + " шт.;"
        }
        
      }
    }
    break;
  default:
    if (field("Подзадачи").length > 0) {
      var subToDos = field("Подзадачи");
      var done = 0;
      var notDone = 0;
      var needed = 0;
      if (subToDos.length > 0) {
        for (var i = 0; i < subToDos.length; i++) {
          if (subToDos[i].field("Необходимо")) {
            needed = needed + 1;
            if (subToDos[i].field("Завершено")) {
              done = done + 1;
            }
          }
        }
      }

      notDone = needed - done;
      if (notDone === 0) {
        result = "Выполнено: \u2714";
      } else {
        result = "Выполнено: " + done + " / " + needed + "; Осталось: " + notDone;
      }
    }
}

if(type === "Раскопка" || type === "Благоустройство"){
  var excavation = field(type);
  result = excavation[0].field("name") + "\n" + result;
}

result;

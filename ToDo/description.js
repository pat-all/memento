var type = field("Тип");
var result = "";

switch (type) {
  case "Монтировать насосы":
  case "Насосы на склад":
  case "Демонтировать насосы":
    var pumpsCount = field("Насосы").length;
    result = "Насосов: " + pumpsCount + " шт.";
    break;

  default:
    if (field("Подзадачи")) {
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
      }
      result = "Выполнено: " + done + " / " + needed + "; Осталось: " + notDone;
    }
}

result;

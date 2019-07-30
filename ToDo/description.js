var subToDos = field("Подзадачи");
var result = "";
if(subToDos.length > 0){
  for(var i = 0; i < subToDos.length; i++){
    if(subToDos[i].field("Необходимо") && !subToDos[i].field("Завершено")){
      if(result.length > 0){
        result = result + "\n" + subToDos[i].field("name");
      } else {
        result = subToDos[i].field("name");
      }
    }
  }
}
result
var defects = lib();
var todos = libByName("ToDo");
var defectsType = "Дефекты";
var defectsField = "Дефекты";

function checkForTodoByType(type){
  var todosArr = todos.entries();
  var exists = false;
  for(var i = 0; i < todosArr.length; i++){
    var todoType = todosArr[i].field("Тип");
    if(type === todoType){
      exists = true;
    }
  }
  if(!exists){
    todos.create({"Тип": type});
  }
}

function getToDoByType(type){
  var todosArr = todos.entries();
  for(var i = 0; i < todosArr.length; i++){
    var todoType = todosArr[i].field("Тип");
    if(type === todoType){
      return todosArr[i];
    }
  }
}

function checkDefects(){
  var todoDefects = [];
  for(var i = 0; i < defects.length; i++){
    var defect = defects[i];
    if(!defect.field("Сдан в ремонт")){
      todoDefects.push(defect);
    }
  }
  if(todoDefects.length > 0){
    checkForTodoByType(defectsType);
    getToDoByType(defectsType).set(defectsField, todoDefects);
  }
}

checkDefects();
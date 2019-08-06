var defectsField = "Дефекты";
var pumpsField = "Насосы";

var defectsType = "Дефекты";

var pumpsStatus = [
  {type: "Монтировать насосы", status: "Не смонтирован после ремонта"},
  {type: "Насосы на склад", status: "Демонтирован для ремонта"},
];

var repairs = libByName("Ремонты").entries();
var defects = libByName("Дефекты").entries();
var pumps = libByName("Насосы").entries();
var todos = lib();

function checkForTodoByType(type){
  var todosArr = todos.entries();
  var exists = false;
  for(var i = 0; i < todosArr.length; i++){
    var todoType = todosArr[i].field("Type");
    if(type === todoType){
      exists = true;
    }
  }
  if(!exists){
    todos.create({"Type": type});
  }
}

function getToDoByType(type){
  var todosArr = todos.entries();
  for(var i = 0; i < todosArr.length; i++){
    var todoType = todosArr[i].field("Type");
    if(type === todoType){
      return todosArr[i];
    }
  }
}

function checkDefects(){
  checkForTodoByType(defectsType);
  var todoDefects = [];
  for(var i = 0; i < defects.length; i++){
    var defect = defects[i];
    if(!defect.field("Сдан в ремонт")){
      todoDefects.push(defect);
    }
  }
  getToDoByType(defectsType).set(defectsField, todoDefects);
}

function pumpsToInstall(type, status){
  checkForTodoByType(type);
  var pumpsArr = [];
  for(var i = 0; i < pumps.length; i++){
    var pump = pumps[i];
    if(pump.field("Статус") === status){
      pumpsArr.push(pump);
    }
  }
  getToDoByType(type).set(pumpsField, pumpsArr);
}

checkDefects();

for(var i = 0; i < pumpsStatus.length; i++){
  var type = pumpsStatus[i].type;
  var status = pumpsStatus[i].status;
  pumpsToInstall(type, status);
}

var defectsField = "Дефекты";
var pumpsField = "Насосы";
var shutdownsField = "Отключения";
var repairsField = "Ремонты";

var defectsType = "Дефекты";
var shutdownsType = "Отключения";
var planedRepairsType = "Плановые ремонты";

var pumpsStatus = [
  {type: "Монтировать насосы", status: "Не монтирован после ремонта"},
  {type: "Насосы на склад", status: "Демонтирован для ремонта"},
  {type: "Демонтировать насосы", status: "Неисправен"},
];

var repairs = libByName("Ремонты").entries();
var defects = libByName("Дефекты").entries();
var pumps = libByName("Насосы").entries();
var shutdowns = libByName("Отключения").entries();
var todos = lib();

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

function pumpsToInstall(type, status){
  var pumpsArr = [];
  for(var i = 0; i < pumps.length; i++){
    var pump = pumps[i];
    if(pump.field("Статус") === status){
      pumpsArr.push(pump);
    }
  }
  if(pumpsArr.length > 0){
    checkForTodoByType(type);
    getToDoByType(type).set(pumpsField, pumpsArr);
  }
}

function planedRepairsCheck(){
  var todoPlanedRepairs = [];
  for(var i = 0; i < repairs.length; i++){
    var isPlaned = repairs[i].field("Плановый");
    var isDone = repairs[i].field("Завершён");
    if(isPlaned && !isDone){
      todoPlanedRepairs.push(repairs[i]);
    }
  }
  if(todoPlanedRepairs.length > 0){
    checkForTodoByType(planedRepairsType);
    getToDoByType(planedRepairsType).set(repairsField, todoPlanedRepairs);
  }
}

function shutdownsCheck(){
  //based on "Статус" field
  var toDoShutdowns = [];
  for(var i = 0; i < shutdowns.length; i++){
    var status = shutdowns[i].field("Статус");
    if(status !== "#00C851"){
      toDoShutdowns.push(shutdowns[i]);
    }
  }
  if(toDoShutdowns.length > 0){
    checkForTodoByType(shutdownsType);
    getToDoByType(shutdownsType).set(shutdownsField, toDoShutdowns);
  }
}

//executions
checkDefects();
shutdownsCheck();
planedRepairsCheck();

for(var i = 0; i < pumpsStatus.length; i++){
  var type = pumpsStatus[i].type;
  var status = pumpsStatus[i].status;
  pumpsToInstall(type, status);
}

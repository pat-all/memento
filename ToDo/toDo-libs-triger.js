var defectsField = "Дефекты";
var pumpsField = "Насосы";
var shutdownsField = "Отключения";
var repairsField = "Ремонты";

var defectsType = "Дефекты";
var shutdownsType = "Отключения";
var planedRepairsType = "Плановые ремонты";

//combinations of ToDos types (field("Тип")) and pumps (entry of "Насосы" library) status (field("Статус"))
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

/**
 * function checks for ToDo in ToDos library, if is not found ToDo with shuch name - creates it.
 * @param {string} type - type of ToDo - ToDo name in ToDo library;
 */
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

/**
 * 
 * @param {string} type - type of ToDo - ToDo name in "ToDo" library;
 * @function checkForTodoByType - at first this function is called to check for ToDo;
 * @returns ToDo whith nessesuary field("Тип").  
 */
function getToDoByType(type){
  checkForTodoByType(type);
  var todosArr = todos.entries();
  for(var i = 0; i < todosArr.length; i++){
    var todoType = todosArr[i].field("Тип");
    if(type === todoType){
      return todosArr[i];
    }
  }
}

/**
 * function checks "Дефекты" library for unrepaired defects and add them to "Дефекты" ToDo in "ToDo" library.
 */
function checkDefects(){
  var todoDefects = [];
  for(var i = 0; i < defects.length; i++){
    var defect = defects[i];
    if(!defect.field("Сдан в ремонт")){
      todoDefects.push(defect);
    }
  }
  if(todoDefects.length > 0){
    getToDoByType(defectsType).set(defectsField, todoDefects);
  }
}

/**
 * function checks "ToDo" library for ToDo whith a field("Тип"), and "Насосы" library by field("Статус").
 * adds all pumps ("Насосы" library entries) to ToDo with a selected type (field("Тип")).
 * @param {string} type - ToDo whith a field("Тип") - name of a ToDo in "ToDo" library. 
 * @param {string} status - field("Статус") of a "Насосы" library entry (pump).
 */
function pumpsToDo(type, status){
  var pumpsArr = [];
  for(var i = 0; i < pumps.length; i++){
    var pump = pumps[i];
    if(pump.field("Статус") === status){
      pumpsArr.push(pump);
    }
  }
  if(pumpsArr.length > 0){
    getToDoByType(type).set(pumpsField, pumpsArr);
  }
}

/**
 * function checks "Ремонты" library for planed and not done repairs.
 * add them to ToDo in "ToDo" library
 */
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
    getToDoByType(planedRepairsType).set(repairsField, todoPlanedRepairs);
  }
}

/**
 * function check "Отключения" library by status (field("Статус")). 
 * if status is not "#00C851" add them to ToDo in "ToDo" library.
 */
function shutdownsCheck(){
  var toDoShutdowns = [];
  for(var i = 0; i < shutdowns.length; i++){
    var status = shutdowns[i].field("Статус");
    if(status !== "#00C851"){
      toDoShutdowns.push(shutdowns[i]);
    }
  }
  if(toDoShutdowns.length > 0){
    getToDoByType(shutdownsType).set(shutdownsField, toDoShutdowns);
  }
}

//executions
checkDefects();
shutdownsCheck();
planedRepairsCheck();

//check all combinations for pumps
for(var i = 0; i < pumpsStatus.length; i++){
  var type = pumpsStatus[i].type;
  var status = pumpsStatus[i].status;
  pumpsToDo(type, status);
}

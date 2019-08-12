var subToDosLib = libByName("subToDo");
var todoType = entry().field("Тип");
if(todoType === "Другое"){
  exit();
}

var subTodos = [];

var ToDos = [
  {toDo: "Раскопка", subTodos: ["Заказать технику", "Наряд", "Службы", "Ограждения", "Доки на благоустройсво"]},
  {toDo: "Благоустройство", subTodos: ["Планировка", "Подготовка корыта", "Щебенение", "Установка бордюров", "Укладка чернозема"]},
  //sub Todos:
  {toDo: "Укладка плит", subTodos: ["Заказать технику", "Наряд"]},
  {toDo: "Засыпка", subTodos: ["Заказать технику", "Укладка плит", "Наряд"]},
  {toDo: "Подготовка корыта", subTodos: ["Заказать технику"]},
  {toDo: "Щебенение", subTodos: ["Заказать технику", "Заказать на складе"]},
  {toDo: "Установка бордюров", subTodos: ["Заказать технику"]},
  {toDo: "Планировка", subTodos: ["Заказать технику", "Засыпка"]},
  {toDo: "Укладка чернозема", subTodos: ["Планировка", "Заказать на складе"]},
  {toDo: "Откачка воды", subTodos: ["Заказать технику"]},
  {toDo: "Вывоз мусора", subTodos: ["Заказать технику"]},
  {toDo: "Ревизия задвижки", subTodos: ["Отключение трубопровода"]},
  {toDo: "Демонтаж задвижки", subTodos: ["Отключение трубопровода"]},
  {toDo: "Монтаж задвижки", subTodos: ["Отключение трубопровода"]},
  {toDo: "Демонтаж трубопровода", subTodos: ["Отключение трубопровода", "Покраска", "Теплоизоляция трубопровода"]},
  {toDo: "Монтаж трубопровода", subTodos: ["Отключение трубопровода"]},
  {toDo: "Монтаж спускников", subTodos: ["Отключение трубопровода"]},
  {toDo: "Теплоизоляция ВВП", subTodos: ["Заказать на складе", "Забрать со склада"]},
  {toDo: "Теплоизоляция трубопровода", subTodos: ["Заказать на складе", "Забрать со склада"]},
  {toDo: "Покраска", subTodos: ["Заказать на складе", "Забрать со склада"]},
  {toDo: "Демонтаж насоса", subTodos: ["Отключение трубопровода"]},
  {toDo: "Монтаж насоса", subTodos: ["Отключение трубопровода"]},
  {toDo: "Перевезти на склад", subTodos: ["Заказать технику"]},
  {toDo: "Забрать со склада", subTodos: ["Заказать технику"]},
  {toDo: "Ремонт насоса", subTodos: ["Демонтаж насоса"]},
  {toDo: "Службы", subTodos: ["Каб. Сети", "Газ", "Телефон", "Канализация", "Водоканал"]},
  {toDo: "Доки на благоустройсво", subTodos: ["Ордер", "Схема асфальта", "Схема зел. зоны"]},
  {toDo: "Ограждения", subTodos: []},
  {toDo: "Заказать технику", subTodos: []},
  {toDo: "Наряд", subTodos: []},
  {toDo: "Отключение трубопровода", subTodos: []},
  {toDo: "Каб. Сети", subTodos: []},
  {toDo: "Газ", subTodos: []},
  {toDo: "Телефон", subTodos: []},
  {toDo: "Канализация", subTodos: []},
  {toDo: "Водоканал", subTodos: []},
  {toDo: "Ордер", subTodos: []},
  {toDo: "Схема асфальта", subTodos: []},
  {toDo: "Схема зел. зоны", subTodos: []},
];

/**
 * find ToDo in ToDos[] array
 * @param {string} toDoName 
 * @returns toDo object - element from ToDos[] array
 */
function findToDoByName(toDoName){
  for(var i = 0; i < ToDos.length; i++){
    if(toDoName === ToDos[i].toDo){
      return ToDos[i];
    }
  }
}

/**
 * Deep search for subTodos.
 * @param {object: {toDo{string}, subTodos{[string]}}} toDo - element from ToDos array.
 * @returns {ToDo} - object: {toDo: {string}, subTodos: [{ToDo}]}
 */
function findSubToDos(toDo){
  if(toDo.subTodos !== undefined && toDo.subTodos.length > 0){
    for(var i = 0; i < toDo.subTodos.length; i++){
      toDo.subTodos[i] = findToDoByName(toDo.subTodos[i]);
      findSubToDos(toDo.subTodos[i]);
    }
  }
  return toDo;
}

/**
 * Find ToDo in ToDos[] array by name and tranforms it to object {toDo: {string}, subTodos: [{ToDo}]};
 * @param {string} todoName 
 * @returns {ToDo} - object: {toDo: {string}, subTodos: [{ToDo}]}
 */
function transformToDo(todoName){
  var toDo = findToDoByName(todoName);
  return findSubToDos(toDo);
}

/**
 * Creates entries in subTodo library and add them as subTodos for current ToDo.
 * @param {ToDo} toDo object: {toDo: {string}, subTodos: [{ToDo}]}
 */
function createSubtodos(toDo){
  if(toDo.subTodos.length === entry().field("Подзадачи").length){
    exit();
  }
  subs = toDo.subTodos;
  var subsArr = [];
  if(subs.length > 0){
    for(var i = 0; i < subs.length; i++){
      var subTodo = subToDosLib.create({"Тип": subs[i].toDo});
      subsArr.push(subTodo);
    }
  }
  entry().set("Подзадачи", subsArr);
}

var toDo = transformToDo(todoType);
createSubtodos(toDo);
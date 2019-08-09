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

var todoType = entry().field("Тип");
var toDosLib = lib();
var subToDosLib = libByName("subToDo");
var toDo = {};
var subTodos = [];

function findToDoByName(toDoName){
  var toDo = {};
  for(var i = 0; i < ToDos.length; i++){
    if(toDoName === ToDos[i].toDo){
      toDo = ToDos[i];
    }
  }
  return toDo;
}

function findSubToDos(toDo){
  if(toDo.subTodos !== undefined && toDo.subTodos.length > 0){
    for(var i = 0; i < toDo.subTodos.length; i++){
      toDo.subTodos[i] = findToDoByName(toDo.subTodos[i]);
      findSubToDos(toDo.subTodos[i]);
    }
  }
  return toDo;
}

function transformToDo(todoName){
  var toDo = findToDoByName(todoName);
  return findSubToDos(toDo);
}

function createSubtodos(toDo){
  if(toDo.subTodos.length === entry().field("Подзадачи").length){
    exit();
  }
  subs = toDo.subTodos;
  var objects = [];
  if(subs.length > 0){
    for(var i = 0; i < subs.length; i++){
      var obj = {};
      obj = subToDosLib.create({"Тип": subs[i].toDo});
      objects.push(obj);
    }
  }
  entry().set("Подзадачи", objects);
  return objects;
}

toDo = transformToDo(todoType);
createSubtodos(toDo);
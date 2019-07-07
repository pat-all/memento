var equipmentType = field("Тип оборудования");
var defects = "";
var pipeTypes = [];

switch(equipmentType){
  case "Насос":
    defects = field("Дефекты насоса").toString();
    break;
  case "Теплообменник":
    defects = field("Дефекты теплообменника").toString();
    break;
  case "Трубопровод":
    defects = "Тр/п: ";
    pipeTypes = field("Тип трубопровода");
    for(var i = 0; i < pipeTypes.length; i++){
      if(i > 0){
        defects = defects + ", " + pipeTypes[i];
      } else {
        defects = pipeTypes[i];
      }
    }
    break;
  default:
}

defects

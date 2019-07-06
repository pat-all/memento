var equipmentType = field("Тип оборудования");
var defects = "";
var pipeTypes = [];
var heatPipes = [];
var hotWaterPipes = [];
var coldWaterPipes = [];
var defArr = [];
var equipment = "";

switch(equipmentType){
  case "Насос":
    defects = field("Дефекты насоса").toString();
    break;
  case "Теплообменник":
    defects = field("Дефекты теплообменника").toString();
    break;
  case "Трубопровод":
    pipeTypes = field("Тип трубопровода");
    for(var i = 0; i < pipeTypes.length; i++){
      if(pipeTypes[i] === "ЦО"){
      defects = "ЦО:"
      heatPipes = field("Тр/п ЦО");
        for(var hP = 0; hP < heatPipes.length; hP++){
          if(hP > 0){
            defects = defects + ", " + heatPipes[hP];
          } else {
            defects = defects + heatPipes[hP];
          }
          
        }
      }
    }
    break;
  default:
}

defects

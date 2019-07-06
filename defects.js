var equipmentType = field("Тип оборудования");
var equipment = null;
var from = null;
var to = null;
var defectiveEquipment = null;

switch(equipmentType){
  case "Насос":
    equipment = field(equipmentType)[0].field("Маркировка");
    from = field(equipmentType)[0].field("Teпловой пункт")[0].field("Адрес");
    defectiveEquipment = from + ": " + equipment;
    break;
  case "Теплообменник":
    equipment = field(equipmentType)[0].field("Маркировка");
    from = field(equipmentType)[0].field("Teпловой пункт")[0].field("Адрес");
    defect = from + ": " + equipment;
    break;
  case "Трубопровод":
    if(field('От') === 'ТП'){
      from = 'ТП ' + field('от ТП')[0].field('Адрес');
    } else if(field('От') === 'ТК'){
      from = 'ТК ' + field('от ТК')[0].field('#ТК');
    } 

    if(field('До') === 'ТП'){
      to = 'ТП ' + field('до ТП')[0].field('Адрес');
    } else if(field('До') === 'ТК'){
      to = 'ТК ' + field('до ТК')[0].field('#ТК');
    } else if(field('До') === 'ж/д'){
      to = 'ж/д ' + field('до ж/д')[0].field('до ж/д');
    }
    defectiveEquipment = from + "-" + to;
    break;
  default:
}

defectiveEquipment

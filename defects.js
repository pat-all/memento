var equipmentType = field("Тип оборудования");
var equipment = '';
var equipmentMark = '';
var from = '';
var to = '';
var defectiveEquipment = '';
var adress = '';

switch(equipmentType){
  case "Насос":
  case "Теплообменник":
    equipment = field(equipmentType);
    if(Array.isArray(field(equipmentType))){
       equipment = field(equipmentType)[0];
    } else { equipment = field(equipmentType); }
    equipmentMark = equipment.field("Маркировка");
    if(Array.isArray(equipment.field("Teпловой пункт")){
      from = equipment.field("Teпловой пункт")[0];
    } else {from = equipment.field("Teпловой пункт")}
    adress = from.field("Адрес");
    defectiveEquipment = adress + ": " + equipmentMark;
    break;
  case "Трубопровод":
    if(field('От') === 'ТП' || field('От') === 'в ТП'){
      from = 'ТП ' + field('от ТП')[0].field('Адрес');
    } else if(field('От') === 'ТК' || field('От') === 'в ТК'){
      from = 'ТК ' + field('от ТК')[0].field('#ТК');
    } else if(field('От' === "в ж/д")){
      from = "ж/д " + field('в ж/д')[0].field('Адрес');
    }
    if(field('От') === 'ТП' || field('От') === 'ТК'){
      if(field('До') === 'ТП'){
      to = ' - ТП ' + field('до ТП')[0].field('Адрес');
      } else if(field('До') === 'ТК'){
      to = ' - ТК ' + field('до ТК')[0].field('#ТК');
      } else if(field('До') === 'ж/д'){
      to = ' - ж/д ' + field('до ж/д')[0].field('до ж/д');
      }
    }
    
    defectiveEquipment = from + to;
    break;
  default:
}

defectiveEquipment

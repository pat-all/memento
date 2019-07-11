/**
 * Определяем тип оборудования с дефектом
 */

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
    equipment = field(equipmentType)[0];
    equipmentMark = equipment.field("Маркировка");
    adress = equipment.field("Адрес ТП");
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
      to = ' - ж/д ' + field('до ж/д')[0].field('Адрес');
      }
    }
    
    defectiveEquipment = from + to;
    break;
  default:
}

defectiveEquipment

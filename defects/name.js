/**
 * Определяем тип оборудования с дефектом
 */

var equipmentType = field("Тип оборудования");
var equipment = "";
var equipmentMark = "";
var from = "";
var to = "";
var defectiveEquipment = "";
var adress = "";

switch (equipmentType) {
  case "Насос":
  case "Теплообменник":
    equipment = field(equipmentType)[0];
    equipmentMark = equipment.field("name");
    adress = equipment.field("description");
    defectiveEquipment = adress + ": " + equipmentMark;
    break;
  case "Трубопровод":
    if (field("От") === "ТП" || field("От") === "в ТП") {
      from = "ТП " + field("от ТП")[0].field("name");
    } else if (field("От") === "ТК" || field("От") === "в ТК") {
      from = "ТК " + field("от ТК")[0].field("name");
    } else if (field("От") === "в ж/д" || field("От") === "ж/д") {
      from = "ж/д " + field("от ж/д")[0].field("name");
    }
    if (field("От") === "ТП" || field("От") === "ТК" || field("От") === "ж/д") {
      if (field("До") === "ТП") {
        to = " - ТП " + field("до ТП")[0].field("name");
      } else if (field("До") === "ТК") {
        to = " - ТК " + field("до ТК")[0].field("name");
      } else if (field("До") === "ж/д") {
        to = " - ж/д " + field("до ж/д")[0].field("name");
      }
    }

    defectiveEquipment = from + to;
    break;
  default:
}

defectiveEquipment;

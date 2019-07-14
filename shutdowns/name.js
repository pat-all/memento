var equipType = field("Оборудование");
var name = "";
var system = "";

switch (equipType) {
  case "Система":
    var TP = field("ТП")[0].field("name");
    system = field("Системы");
    name ="ТП " + TP + ": " + system;
    break;
  case "Насос":
    var pump = field("Насосы")[0];
    name = pump.field("description") + ": " + pump.field("name");
    break;
  case "Потребитель":
    system = field("Системы");
    name = "Потребителей по: " + system;
    break;

  default:
    break;
}

name;

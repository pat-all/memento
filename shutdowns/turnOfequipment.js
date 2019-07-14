var equpType = entry().field("Оборудование");
var adressTP = "";
var system = "";
var resultPumps = [];
var resultCustomers = [];
var result = "";
var pumpLib = libByName("Насосы");
var customerLib = libByName("Потребители");
var message = "";
function turnedOffPumps(group) {
  var pumps = pumpLib.find(adressTP);
  for (var i = 0; i < pumps.length; i++) {
    if (pumps[i].field("Группа") === group) {
        resultPumps.push(pumps[i]);
    }
  }
  return resultPumps;
}
function turnedOffCustomers(adressTP) {
  resultCustomers = libByName("Потребители").find(adressTP);
}
function equipment(equpType) {
  switch (equpType) {
    case "Система":
      if (entry().field("ТП") !== null) {
        adressTP = entry()
          .field("ТП")[0]
          .field("name");
      }
      var system = entry().field("Системы");
      switch (system) {
        case "ГВС":
          turnedOffPumps("НЦ-ГВС");
          turnedOffPumps("ПЦН");
          turnedOffCustomers(adressTP);
          break;
        case "ХВС":
          turnedOffPumps("ПХН");
          turnedOffCustomers(adressTP);
          break;
        case "ЦО Зависимая":
          turnedOffCustomers(adressTP);
          break;
        case "ЦО Независимая":
          turnedOffPumps("НЦО");
          turnedOffPumps("НПО");
          turnedOffCustomers(adressTP);
          break;
        default:
          break;
      }
      break;
    case "Насос":
      adressTP = entry().field("Насосы")[0].field("description");
      turnedOffCustomers(adressTP);
      break;
    case "Потребитель":
      var system = entry().field("Системы");
      resultCustomers = entry().field("Потребители");
      break;
    default:
      break;
  }
}
equipment(equpType);
entry().set("Насосы", resultPumps);
entry().set("Потребители", resultCustomers);
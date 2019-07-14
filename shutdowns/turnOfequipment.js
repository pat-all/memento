var equpType = entry().field("Оборудование");
var adressTP = "";
var system = "";
var resultPumps = [];
var resultCustomers = [];
var result = "";
var pumpLib = libByName("Насосы");
var customerLib = libByName("Потребители");
var message = "";
function turnedOffPumps(system) {
  var pumps = pumpLib.find(adressTP);
  for (var i = 0; i < pumps.length; i++) {
    if (pumps[i].field("Группа") === system) {
      if (result.length === 0) {
        result = result + pumps[i].field("name");
        resultPumps.push(pumps[i]);
      } else {
        result = result + ", " + pumps[i].field("name");
        resultPumps.push(pumps[i]);
      }
    }
  }
  return resultPumps;
}
function turnedOffCustomers(adressTP) {
  var customers = libByName("Потребители").find(adressTP);
  resultCustomers = customers.sort(function(a, b) {
    if (a.field("name") > b.field("name")) {
      return 1;
    }
    if (a.field("name") < b.field("name")) {
      return -1;
    }
    return 0;
  });
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
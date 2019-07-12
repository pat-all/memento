/**
 * формируем список оключенного оборудования и/или потребителей
 */
var equpTypes = entry().field("Оборудование");

var adressTP = "";

var system = "";

var resultPumps = [];

var resultCustomers = [];

var resultSystems = "";

var result = "";

var pumpLib = libByName("Насосы");

var customerLib = libByName("Потребители");

function turnedOffPumps(system) {
  var pumps = pumpLib.find(adressTP);

  for (var i = 0; i < pumps.length; i++) {
    if (pumps[i].field("Группа") === system) {
      if (result.length === 0) {
        result = result + pumps[i].field("Маркировка");

        resultPumps.push(pumps[i]);
      } else {
        result = result + ", " + pumps[i].field("Маркировка");

        resultPumps.push(pumps[i]);
      }
    }
  }

  return resultPumps;
}

function turnedOffCustomers() {
  var customers = libByName("Потребители").find(adressTP);

  resultCustomers = customers;
}

function turnedOffSystems(system) {
  if (resultSystems.length === 0) {
    resultSystems = resultSystems + system;
  } else {
    resultSystems = resultSystems + ", " + system;
  }
}

function equipment(equpType) {
  switch (equpType) {
    case "Система":
      if (entry().field("ТП") !== null) {
        adressTP = entry()
          .field("ТП")[0]
          .field("Адрес");
      }

      var systems = entry().field("Системы");

      for (var i = 0; i < systems.length; i++) {
        system = systems[i];

        switch (system) {
          case "ГВС":
            turnedOffSystems(system);

            turnedOffPumps("НЦ-ГВС");

            turnedOffPumps("ПЦН");

            turnedOffCustomers();

            break;

          case "ХВС":
            turnedOffSystems(system);

            turnedOffPumps("ПХН");

            turnedOffCustomers();

            break;

          case "ЦО Зависимая":
            turnedOffSystems(system);

            turnedOffCustomers();

            break;

          case "ЦО Независимая":
            turnedOffSystems(system);

            turnedOffPumps("НЦО");

            turnedOffPumps("НПО");

            turnedOffCustomers();

            break;

          default:
            break;
        }
      }

      break;

    case "Насос":
      turnedOffCustomers();

      break;

    case "Потребитель":
      var systems = entry().field("Системы");

      for (var i = 0; i < systems.length; i++) {
        turnedOffSystems(systems[i]);
      }

      resultCustomers = entry().field("Потребители");

      break;

    default:
      break;
  }
}

for (let i = 0; i < equpTypes.length; i++) {
  const equpType = equpTypes[i];

  equipment(equpType);
}

entry().set("Насосы", resultPumps);

entry().set("Потребители", resultCustomers);

entry().set(
  "Отключенное",
  "Потебителей: " +
    entry().field("Потребители").length +
    "\nСистемы: " +
    resultSystems
);

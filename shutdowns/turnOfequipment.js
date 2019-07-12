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

function turnedOffPumps(system){
    if(resultSystems.length === 0){
        resultSystems = resultSystems + system;
    } else {
        resultSystems = resultSystems + ", " + system;
    }
    var pumps = pumpLib.find(adressTP);            
            for(var i = 0; i < pumps.length; i++){
                if(pumps[i].field('Группа') === system){
                    if(result.length === 0){
                        result = result + pumps[i].field("Маркировка");
                        resultPumps.push(pumps[i]);
                    } else {
                        result = result + ', ' + pumps[i].field("Маркировка");
                        resultPumps.push(pumps[i]);
                    }
                }
            }
    return resultPumps;
}

function turnedOffCustomers() {
    var customers = customerLib.find(adressTP);
    resultCustomers = customers;
}

if(entry().field("ТП") !== null){
    adressTP = entry().field("ТП")[0].field("Адрес");
}

function equipment(equpType){
    switch(equpType){
        case "Система":
            var systems = entry().field("Системы");

            for(var i = 0; i < systems.length; i++){
                system = systems[i];
                switch (system) {
                    case "ГВС":
                        turnedOffPumps("НЦ-ГВС");
                        turnedOffPumps("ПЦН");
                        turnedOffCustomers();
                        break;
                    case "ХВС":
                        turnedOffPumps("ПХН");
                        turnedOffCustomers();
                        break;
                    case "ЦО Зависимая":
                        turnedOffCustomers();
                        break;
                    case "ЦО Независимая":
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
            break;
        default:
            break;
    }
}

for (let i = 0; i < equpTypes.length; i++) {
    const equpType = equpTypes[i];
    equipment(equpType);
}


entry().set("Отключенное", "Потебителей: " + resultCustomers.length +  "\nСистемы: " + resultSystems);
entry().set("Насосы", resultPumps);
entry().set("Потребители", resultCustomers);
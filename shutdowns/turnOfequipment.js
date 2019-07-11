/**
 * формируем список оключенного оборудования и/или потребителей
 */
var equpTypes = field("Оборудование");
var adressTP = "";
var system = "";
var pumps = [];
var customers = [];
var result = "";
var pumpLib = libByName("Насосы").entries();
var customerLib = libByName("Потребители");

if(field("ТП") !== null){
    adtessTP = field("ТП")[0].field("Адрес");
}

function equipment(equpType){
    switch(equpType){
        case "Система":
            system = "ГВС";
            pumps = pumpLib.find(adressTP).find(system);
            for(var i = 0; i < pumps.length; i++){
                if(i === 0){
                    result = result + pumps[0]
                } else {
                    result = result + ', ' + pumps[i];
                }
            }
            break;
        case "Насос":
            break;
        case "Потребитель":
            break;
        default:

    }
}

entry().set("Отключенное", result);
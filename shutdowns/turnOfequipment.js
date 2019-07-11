/**
 * формируем список оключенного оборудования и/или потребителей
 */
var equpTypes = entry().field("Оборудование");
var adressTP = "";
var systema = "";
var pumps = [];
var customers = [];
var result = "";
var pumpLib = libByName("Насосы");
var customerLib = libByName("Потребители");

if(field("ТП") !== null){
    adtessTP = entry().field("ТП")[0].field("Адрес");
}

function equipment(equpType){
    switch(equpType){
        case "Система":
            systema = "ГВС";
            pumps = pumpLib.find(adressTP).filter(function(pump){pump.field("Группа") === "НЦ-ГВС"});
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

equipment(equpTypes[0]);

entry().set("Отключенное", result);
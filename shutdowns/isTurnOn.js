/**
 * Проверяем включено ли отключенное оборудование
 */

var now = moment();
var turnOn = moment(field("Включено"));
var color = '#ff4444';
if(field("Включено") !== null && now.isAfter(turnOn)){
    color = '#00C851';
}

color
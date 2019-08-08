var mesures = entry().field("Показания");
var info = "";

mesures.sort(function(a, b){
  if(moment(a.field("Дата").isBefore(moment(b.field("Дата"))))){
    return -1;
  }
  if(moment(a.field("Дата").isAfter(monemt(b.field("Дата"))))){
    return 1;
  }
  return 0;
});

for(var i = 1; i < mesures.length; i++){
  var currentMeterReading = Number(mesures[i].field("Показания"));
  var prevMeterReading = Number(mesures[i - 1].field("Показания"));
  var dif = currentMeterReading - prevMeterReading;
  var period = moment(mesures[i].field("Дата")).diff(moment(mesures[i - 1].field("Дата")), "days");
  var perDay = Math.round(dif / period);
  mesures[i].field("Инфо") = "Кубов: " + dif + " за " + period + "дней \nКубов/день: " + perDay;
}
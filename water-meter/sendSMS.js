var msg = "";
var waterMeters = libByName("Водомеры").entries();
var generalMeters = waterMeters.filter(function(meter){
  return meter.field("Тип") === "Общий";
});

for(var i = 0; i < generalMeters.length; i++){
  var generalMeter = generalMeters[i];
  var adress = generalMeter.field("Тепловой пункт")[0].field("name");
  var meterReadings = field("Показания");
  var meterReading = meterReadings[meterReadings.length - 1].field("Показания");
  if(msg.length > 0){
    msg = msg + "\n" + adress + ": " + meterReading;
  } else {
    msg = adress + ": " + meterReading;
  }
}

message(msg);
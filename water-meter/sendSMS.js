var msg = "Общие:";
var waterMeters = lib().entries();
for (var i = 0; i < waterMeters.length; i++) {
  var waterMeter = waterMeters[i];
  if (waterMeter.field("Тип") === "Общий") {
    var adress = waterMeter.field("Тепловой пункт")[0].field("name");
    var meterReadings = waterMeter.field("Показания");
    var meterReading = meterReadings[meterReadings.length - 1].field(
      "Показания"
    );
      msg = msg + "\n" + adress + ": " + meterReading;
  }
}

i = intent("android.intent.action.SENDTO");
i.data("smsto:" + "0677987304");
i.extra("sms_body" , msg);  
i.send();
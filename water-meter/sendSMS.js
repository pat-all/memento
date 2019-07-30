var phone = "0677987304";
var GENERAL_METER_READINGS = "Общий";
var SELF_METER_READINGS = "Соб. нужды";
var msg = "";
var waterMeters = lib().entries();

function meterReadingsList(type){
  var list = type;
  for (var i = 0; i < waterMeters.length; i++) {
    var waterMeter = waterMeters[i];
    if (waterMeter.field("Тип") === type) {
      var adress = waterMeter.field("Тепловой пункт")[0].field("name");
      var meterReadings = waterMeter.field("Показания");
      var meterReading = meterReadings[meterReadings.length - 1].field(
        "Показания"
      );
        list = list + "\n" + adress + ": " + meterReading;
    }
  }
  return list;
}

var generalMeterReadings = meterReadingsList(GENERAL_METER_READINGS);
var selfMeterReadings = meterReadingsList(SELF_METER_READINGS);
msg = generalMeterReadings + "\n" + selfMeterReadings;

i = intent("android.intent.action.SENDTO");
i.data("smsto:"+ phone);
i.extra("sms_body" , msg);  
i.send();
var phone = "0677987304";
var GENERAL_METER_READINGS = "Общий";
var SELF_METER_READINGS = "Соб. нужды";
var msg = "";
var errMsg = "Нет данных:";
var err = false;
var waterMeters = lib().entries();

function checkYYYYMM(date) {
  var date = moment(date);
  var recordYear = date.year();
  var recordMonth = date.month();
  return recordYear === moment().year() && recordMonth === moment().month();
}

function meterReadingsList(type) {
  var list = type + ":";
  for (var i = 0; i < waterMeters.length; i++) {
    var waterMeter = waterMeters[i];
    if (waterMeter.field("Тип") === type) {
      var meterReadings = waterMeter.field("Показания");
      var meterReadingDate = meterReadings[meterReadings.length - 1].field(
        "Дата"
      );
      var adress = waterMeter.field("Тепловой пункт")[0].field("name");
      if (checkYYYYMM(meterReadingDate)) {
        var meterReading = meterReadings[meterReadings.length - 1].field(
          "Показания"
        );
        list = list + "\n" + adress + ": " + meterReading;
      } else {
        err = true;
        errMsg = errMsg + "\n" + adress + ": " + type;
      }
    }
  }
  return list;
}

var generalMeterReadings = meterReadingsList(GENERAL_METER_READINGS);
var selfMeterReadings = meterReadingsList(SELF_METER_READINGS);
msg = generalMeterReadings + "\n" + selfMeterReadings;

if (err) {
  message(errMsg);
} else {
  i = intent("android.intent.action.SENDTO");
  i.data("smsto:" + phone);
  i.extra("sms_body", msg);
  i.send();
}

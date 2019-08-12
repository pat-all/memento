var meters = libByName("Водомеры");
var curMeterReading = entry();
var meterLap = meters.linksTo(curMeterReading)[0].field("Круг");

curMeterReading.set("Круг", meterLap);
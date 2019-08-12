var meters = libByName("Водомеры");

var curMeterReading = entry();
message(meters.linksTo(curMeterReading)[0].field("name"));
var material = field("Тип");

var D1 = field("ДУ");
var D2 = field("ДУ-2");
var plate = field("Тип ж/б плиты");
var electrode = field("Тип электродов");
var bearing = field("Тип подшипника");
var boltThread = field("Размер резьбы");

var quantity = field("Количество");
var units = field("Единицы измерения");

var type = "";

if (D1.length > 0) {
  type = D1;
}

if (D2.length > 0) {
  type = D1 + "/" + D2;
}

if (plate.length > 0) {
  type = plate;
}

if (electrode.length > 0) {
  type = electrode;
}

if (bearing.length > 0) {
  type = bearing;
}

if (boltThread.length > 0) {
  type = boltThread;
}

material + " " + type + ": " + quantity + " " + units;

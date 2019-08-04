var figure = field("Фигура");
var x = field("Знаков после запятой");
var S = 0;

function roundNum(num, x){
  var mult = Math.pow(10, x);
  var result = num * mult;
  result = Math.round(result);
  result = result / mult;
  return result;
}

switch(figure) {
  case "Прямоугольник":
    var a = field("a");
    var b = field("b");
    S = a * b;
    break;
  case "Четырехугольник":
    var a = field("a");
    var b = field("b");
    var c = field("c");
    var d = field("d");
    var p = (a + b + c) / 2;
    S = Math.sqrt((p - a) * (p - b) * (p - c) * (p - d));
    break;
  case "Треугольник":
    var a = field("a");
    var b = field("b");
    var c = field("c");
    var p = (a + b + c) / 2;
    S = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    break;
  case "Круг":
    var diametr = field("d");
    S = Math.PI * Math.pow(diametr, 2) / 4;
    break;
  default:
    break;
}

roundNum(S, x);
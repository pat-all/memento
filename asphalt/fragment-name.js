var S = field("S");
var figure = field("Фигура");
var name = "";

switch (figure) {
  case "Прямоугольник":
    name = "S \u2B1C = " + S;
    break;
  case "Треугольник":
    name = "S \u25B2 = " + S;
    break;
  case "Круг":
      name = "S \u2B24 = " + S;
    break;
  default:
    break;
}

name;
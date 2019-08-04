var S = field("S");
var figure = field("Фигура");
var name = "";

switch (figure) {
  case "Прямоугольник":
    name = "S \u25A1 = " + S;
    break;
  case "Треугольник":
    name = "S \u25B3 = " + S;
    break;
  case "Круг":
      name = "S \u24EF = " + S;
    break;
  case "Четырехугольник":
    name = "S \u23E2 = " + S;
    break;
  default:
    break;
}

name;
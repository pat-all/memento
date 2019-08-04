var fragments = field("Фрагменты");
var amendment = field("Поправка");
var x = field("Знаков после запятой");
var courtyardSquare = 0;
var sidewalkSquare = 0;
var highwaySquare = 0;
var resultStr = "";

function roundNum(num, x){
  var mult = Math.pow(10, x);
  var result = num * mult;
  result = Math.round(result);
  result = result / mult;
  return result;
}

function resultingStr(resultStr, str){
  if(resultStr.length > 0){
    return resultStr += "\n" + str;
  } else {
    return resultStr += str;
  }
};

function summSquare(surface, action, square){
  if(action === "Суммировать"){
    surface += square;
  } else if (action === "Отнять"){
    surface -= square;
  }
  return surface;
}

for (var index = 0; index < fragments.length; index++) {
  var fragment = fragments[index];
  var surface = field("Покрытие");
  var action = field("Действие");
  var square = field("S");
  switch (surface) {
    case "Двор":
      courtyardSquare = summSquare(courtyardSquare, action, square);
      break;
    case "Тротуар":
      sidewalkSquare = summSquare(sidewalkSquare, action, square);
      break;
    case "Шоссе":
      highwaySquare = summSquare(highwaySquare, action, square);
      break;
  
    default:
      break;
  }
}

if(courtyardSquare > 0){
  courtyardSquareStr += "Sдвор = " + roundNum(courtyardSquare, x);
  resultStr = resultingStr(resultStr, courtyardSquareStr);
}
if(sidewalkSquare > 0){
  sidewalkSquare += "Sтротуар = " + roundNum(sidewalkSquare, x);
  resultStr = resultingStr(resultStr, courtyardSquareStr);
}
if(highwaySquare > 0){
  courtyardSquareStr += "Sшоссе = " + roundNum(highwaySquare, x);
  resultStr = resultingStr(resultStr, courtyardSquareStr);
}

resultStr;
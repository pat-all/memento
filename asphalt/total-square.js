var fragments = field("Фрагменты");
var amendment = field("Поправка");
var x = field("Знаков после запятой");
var totalSquare = 0;

function roundNum(num, x){
  var mult = Math.pow(10, x);
  var result = num * mult;
  result = Math.round(result);
  result = result / mult;
  return result;
}

for (var index = 0; index < fragments.length; index++) {
  var fragment = fragments[index];
  if(fragment.field("Действие") === "Суммировать"){
    totalSquare += Number(fragment.field("S"));
  } else if (fragment.field("Действие") === "Отнять"){
    totalSquare -= Number(fragment.field("S"));
  }
}

if(amendment !== null){
  totalSquare = totalSquare + amendment;
}

roundNum(totalSquare, x);

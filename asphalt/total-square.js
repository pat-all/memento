var fragments = field("Фрагменты");
var amendment = field("Поправка");
var totalSquare = 0;

for (let index = 0; index < fragments.length; index++) {
  const fragment = fragments[index];
  if(fragment.field("Действие") === "Суммировать"){
    totalSquare = totalSquare + Number(fragment.field("S"));
  } else if (fragment.field("Действие") === "Отнять"){
    totalSquare = totalSquare - Number(fragment.field("S"));
  }
}

totalSquare + amendment;
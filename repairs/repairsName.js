if(field("Вид ремонта") === "Аварийный"){
  var name = field("Дефекты")[0].field("name");
} else if(field("Вид ремонта") === "Плановый"){
  var name = field("ТП")[0].field("Адрес");
}

name;
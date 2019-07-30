var name = field("Тип");

if(field("Необходимо") && field("Завершено")){
  name = "\u2714" + name;
}

name
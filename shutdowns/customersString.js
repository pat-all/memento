var customersArr = field("Потребители");
var customersByStreets = [];
var result = "";

function CustomersByStreet() {return { street: "", buildings: [] }}

for(var i = 0; i < customersArr.length; i++){
  var customerStreet = customersArr[i].field("Улица");
  var customerNumber = " " + customersArr[i].field("Дом") + customersArr[i].field("Литера");
  var streetMatch = false;

  for(var j = 0; j < customersByStreets.length; j++){
    if(customersByStreets[j].street === customerStreet){
      streetMatch = true;
      customersByStreets[j].buildings.push(customerNumber);
    }
  }

  if(!streetMatch){
    var customersStreet = CustomersByStreet();
    customersStreet.street = customerStreet;
    customersStreet.buildings.push(customerNumber);
    customersByStreets.push(customersStreet);
    
  }
}

for(var i = 0; i < customersByStreets.length; i++){
  customersByStreets[i].buildings.sort(function(a, b){
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  });
  if(i < customersByStreets.length - 1){
    result = result + customersByStreets[i].street + ": " + customersByStreets[i].buildings + "; \n"
  } else {
    result = result + customersByStreets[i].street + ": " + customersByStreets[i].buildings + "."
  }
    
}

result
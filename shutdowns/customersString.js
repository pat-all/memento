var customersArr = field("Потребители");
var customersByStreets = [];

function CustomersByStreet() {return { street: "", buildings: [] }}

for(var i = 0; i < customersArr.length; i++){
  var customerStreet = customersArr[i].field("Улица");
  var customerNumber = customersArr[i].field("Дом") + customersArr[i].field("Литера");
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
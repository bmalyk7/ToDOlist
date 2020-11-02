////////////////////////////
//JSON
let obj = { "name":"John", "age":30, "city":"New York"};
let myJSON = JSON.stringify(obj);

document.getElementById("demo").innerHTML = myJSON;

const obj = JSON.parse('{"firstName":"John", "lastName":"Doe"}');

////////////////////////////
//localStorage 
localStorage.setItem("lastname", "Smith");
localStorage.getItem("lastname");
localStorage.remove("lastname");

////////////////////////////
// window.location 
window.location.pathname

window.location.hash


////////////////////////////
// string
string.slice(1);

////////////////////////////
// number
//3.4 => 4
//6 => 6
//0.00000000001 => 1

newNum = Math.ceil(number)

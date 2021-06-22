let storedValues = "0";
let operationNumbers = [];

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;  

const divide = (a, b) => {
  if( b == "0"){
    return "Hey! You can't do that";
  }else return a / b;
}

const operate = (a, operator, b) =>{
  if (operator == "add"){
    return add(a,b);
  }if (operator == "subtract"){
    return subtract(a,b);
  }if (operator == "multiply"){
    return multiply(a, b);
  }if(operator == "divide"){
    return divide(a,b);
  }
}

const startScreenZero = () => {
  if (storedValues.slice(0) == 0){
    storedValues = storedValues.slice(0, storedValues.length - 1);
  }
}

const displayValue = (event) => {
  let clickedNumber = event.target.value
  startScreenZero();
  storedValues += clickedNumber;
  document.body.querySelector("#pressed").value = storedValues;
}

const decimal = (event) => {
  if(!storedValues.includes(".")){
    storedValues += event.target.value;  
  } 
}

const operatorValue = (event) => {
  let operator = event.target.value;
  changeOperatorsOnClick();
  calculate();

  if(operationNumbers.length === 0){
    operationNumbers.push(storedValues)
  }

  if (operator == "add"){ 
    storedValues += "+";
  } else if (operator == "multiply"){
    storedValues += "*"
  } else if (operator == "divide"){
    storedValues += "/"
  } else if (operator == "subtract"){
    storedValues += "-"
  } 
  
  operationNumbers.push(operator);
  
  document.body.querySelector("#pressed").value = storedValues;
}

const changeOperatorsOnClick = () => {
  let lastItem = storedValues.slice(-1);
  
  if(lastItem == "+" || lastItem == "-"|| lastItem == "*" || lastItem == "/"){
    storedValues = storedValues.slice(0, storedValues.length -1);
    operationNumbers.pop()
  } 
}

const cleanScreen = () => {
  storedValues = "0";
  operationNumbers = [];
  document.body.querySelector("#pressed").value = storedValues;
}

const backspace = () => {
  if(storedValues.length != 0){
    storedValues = storedValues.slice(0, storedValues.length -1 )
    document.body.querySelector("#pressed").value = storedValues;
  }
}

const calculate = () => {
  console.log(storedValues)
  let opRegex = /[\/\*\+\-]/;
  let numberStack = storedValues.split(opRegex);
  
  if(storedValues.match(opRegex) !== null) {
    let lastItemInArray = numberStack.pop();
    if(lastItemInArray !== ''){ 
      operationNumbers.push(lastItemInArray)
    }
  }
  
  if(operationNumbers.length == 3){
    storedValues = operate(Number(operationNumbers[0]),operationNumbers[1],Number(operationNumbers[2])).toString();
    operationNumbers = [];
  }
  return storedValues;
}

let numberButtons = document.body.querySelectorAll(".numbers");
for(var x=0; x < numberButtons.length; x++){ 
  numberButtons[x].addEventListener("click", displayValue);
}

let operatorButtons = document.body.querySelectorAll(".operator");
for(var i=0; i < operatorButtons.length; i++){
  operatorButtons[i].addEventListener("click",operatorValue);
}
document.body.querySelector(".equal").addEventListener("click",function(){
  document.body.querySelector("#pressed").value = calculate()
})  

let cleanButton = document.body.querySelectorAll(".clean");
for(var h=0; h < cleanButton.length; h++){ 
  cleanButton[h].addEventListener("click", cleanScreen)
}

let dotButton = document.body.querySelectorAll(".dot");
for(var j=0; j < dotButton.length; j++){ 
  dotButton[j].addEventListener("click", decimal)
}

let deleteButton = document.body.querySelectorAll(".delete");
for(var a=0; a < deleteButton .length; a++){ 
  deleteButton[a].addEventListener("click", backspace)
}

document.addEventListener ('keydown', (event) => {
  let key = event.key;
    if(key == "+"){ key = "add" }
    if(key == "-"){ key = "subtract" }
    if(key == "*"){ key = "multiply" }
    if(key == "/"){ key = "divide" }
    if(key == "=" || key == "Enter"){ key = "operate" }
    if(key == "Backspace"){ key = "backspace" }

      let el = document.querySelector(`button[value='${key}']`)
        if(el !== null) { el.click() } 
  });   

  
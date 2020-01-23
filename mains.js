
function add(a, b){
  return a + b
}

function subtract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}  

function divide(a, b){
  if( b == "0"){
    return "Hey! You can't do that";
  }else return a / b;
}

function operate(a, operator, b){
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

let storedValues = "0";
let operationNumbers = [];

function startScreenZero(){
  if (storedValues.slice(0) == 0){
    storedValues = storedValues.slice(0, storedValues.length - 1);
  }
}
function displayValue(){
  startScreenZero();
  storedValues += this.value;
  document.body.querySelector("#pressed").value = storedValues;
}

function operatorValue(){
  changeOperatorsOnClick();
  calculate();

  if(operationNumbers.length === 0){
    operationNumbers.push(storedValues)
  }

  if (this.value == "add"){ 
    storedValues += "+";
  } else if (this.value == "multiply"){
    storedValues += "*"
  } else if (this.value == "divide"){
    storedValues += "/"
  } else if (this.value == "subtract"){
    storedValues += "-"
  } 
  
  operationNumbers.push(this.value);
  
  document.body.querySelector("#pressed").value = storedValues;
  
}
function calculate(){
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
function changeOperatorsOnClick(){
  
  let lastItem = storedValues.slice(-1);
  
  if(lastItem == "+" || lastItem == "-"|| lastItem == "*" || lastItem == "/"){
    storedValues = storedValues.slice(0, storedValues.length -1);
    operationNumbers.pop()
  } 
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
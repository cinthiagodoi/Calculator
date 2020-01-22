
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
  return a / b;
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
let operationNumbers = []
document.body.querySelector("#pressed").value = storedValues;

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
  let opRegex = /[\/\*\+\-]/;
  let numberStack = storedValues.split(opRegex);
  let lastItemInArray = numberStack.pop();

  
  if(lastItemInArray !== ''){ 
    operationNumbers.push(lastItemInArray)
  }
  
  calculate();
  changeOperatorsOnClick();

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
  if(operationNumbers.length == 3){
    storedValues = operate(Number(operationNumbers[0]),operationNumbers[1],Number(operationNumbers[2])).toString();
    operationNumbers = storedValues.split()
  }
console.log(operationNumbers.length)

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

  let keyButton = document.body.querySelectorAll(".equal");
    for(var j=0; j < keyButton.length; j++){
      keyButton[j].addEventListener("click",function(){
        console.log(operationNumbers)
        document.body.querySelector("#pressed").value = operate(Number(operationNumbers[0]),operationNumbers[1],Number(operationNumbers[2])).toString();
      })  
  } 

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

function decimal(){
  if(!storedValues.includes(".")){
    storedValues += this.value;  
  } 
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

function cleanScreen(){
  storedValues = "0";
  operationNumbers = [];
  document.body.querySelector("#pressed").value = storedValues;
}

function backspace(){
  if(storedValues.length != 0){
    storedValues = storedValues.slice(0, storedValues.length -1 )
    document.body.querySelector("#pressed").value = storedValues;
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

  document.addEventListener ('keypress', (event) => {
    let numbersR = /[0-9]/;
    let operateR = /[+\-\*\/.]/;
    let keyName = event.key;
    if(keyName.match(numbersR) != null){
      storedValues += event.key;
      document.body.querySelector("#pressed").value = storedValues;
    } else if (keyName.match(operateR) != null){
      operationNumbers.push(storedValues);
      storedValues += event.key;
        if(event.key == "+"){operationNumbers.push("add")};
        if(event.key == "-"){operationNumbers.push("subtract")};
        if(event.key == "*"){operationNumbers.push("multiply")};
        if(event.key == "/"){operationNumbers.push("divide")}
        
      document.body.querySelector("#pressed").value = storedValues;
    }
  });   

  

function add(){
  return "+";
}

function subtract(){
  return "-";
}

function multiply(){
  return "*";
}  

function divide(){
  return "/";
}

function operate(operator,a, b){
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

document.body.querySelector("#pressed").value = storedValues;

function startScreenZero(){
  if (storedValues.slice(0) == 0){
    storedValues = storedValues.slice(0, storedValues.lenght - 1);
  }
}
function displayValue(){
  startScreenZero();
  storedValues += this.value;
  document.body.querySelector("#pressed").value = storedValues;
  console.log(storedValues)
}

function operatorValue(){
  changeOperatorsOnClick();
  if (this.value == "add"){
    storedValues += add()
  }else if (this.value == "multiply"){
    storedValues += multiply()
  }else if (this.value == "divide"){
    storedValues += divide()
  }else if (this.value == "subtract"){
    storedValues += subtract()
  } 
  document.body.querySelector("#pressed").value = storedValues;
  console.log(storedValues)
}

function changeOperatorsOnClick(){
  let lastItem = storedValues.slice(-1);
  if(lastItem == "+" || lastItem == "-"|| lastItem == "*" || lastItem == "/"){
    storedValues = storedValues.slice(0, storedValues.length -1);
  } 
}

function calculate(){

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
        document.body.querySelector("#pressed").value = calculate(storedValues);
      })  
  } 
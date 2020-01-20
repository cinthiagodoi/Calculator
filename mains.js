
function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}  

function divide(a, b){
  if(b == 0){
    return document.body.querySelector("#pressed").value = "Error";
  }else {
    return a/b;
  }
}

function operate(operator,a, b){
  console.log("abacaxi");
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

let displayNumbers = "";
let firstNumber = "";
let operatorSinal = "";


function displayValue(){
  let clickValue = this.value;
  displayNumbers += clickValue;
  document.body.querySelector("#pressed").value = displayNumbers;
  console.log(displayNumbers)
}
function operatorValue(){
  firstNumber += displayNumbers;
  let operatorClick = this.value;
  operatorSinal += operatorClick
  displayNumbers= ""
  console.log(operatorClick)
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
        document.body.querySelector("#pressed").value = (operate(operatorSinal, Number(firstNumber),Number(displayNumbers)))
        console.log("aba")
      });
  } 
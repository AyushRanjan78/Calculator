// console.log("linked");

class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand="";
        this.previousOperand="";
        this.operation=undefined;
    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }

       appendNumber(number){
        if(number =="." && this.currentOperand.includes("."))
        return;
        this.currentOperand = this.currentOperand.toString()+number.toString();
       }

       compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        switch(this.operation){
            case "+":
            computation = prev+current;
            break;
            case "-":
            computation = prev-current;
            break;
            case "*":
            computation = prev*current;
            break;
            case "÷":
            computation = prev/current;
            break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation=undefined;

        this.previousOperand="";

       }

       chooseoperation(operation){
        if(this.currentOperand==="")return;
        if(this.previousOperand!==""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand="";
       }

       getDisplayNumber(number){
        const stringNumber = number.toString();
        const interDigit = parseFloat(stringNumber.split(".")[0]);
        const decimalDigit = stringNumber.split(".")[1];

        let integerDisplay;
        if(isNaN(interDigit))integerDisplay="";
        else{
        integerDisplay = interDigit.toLocaleString("en", {maximumFractionDigits:0});
        }
        if(decimalDigit!=null){
            return `${integerDisplay}.${decimalDigit}`;
        }
        else{
            return integerDisplay;
        }
       }

       updateDisplay(){
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
      if(this.operation!=null){
        this.previousOperandTextElement.innerText=this.getDisplayNumber(this.previousOperand)+" "+this.operation;
      }
      else{
        this.previousOperandTextElement.innerText="";
      }
    }
}



const numberButtons = document.querySelectorAll("[data-number]");
// console.log(numberButtons);
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButtons = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allclearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(
    previousOperandTextElement,currentOperandTextElement
    );

numberButtons.forEach((button) => {
    button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        calculator.chooseoperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButtons.addEventListener("click",()=>{
    calculator.compute();
    calculator.updateDisplay();
})

allclearButton.addEventListener("click",()=>{
calculator.clear();
calculator.updateDisplay();
})

deleteButton.addEventListener("click",()=>{
    calculator.delete();
    calculator.updateDisplay();
})
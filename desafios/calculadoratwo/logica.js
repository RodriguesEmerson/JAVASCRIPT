class Calculadora{
    adicao(num1, num2){
        return num1 + num2
    }
    subtracao(num1, num2){
        return num1 - num2
    }
    divisao(num1, num2){
        return num1 / num2
    }
    multiplicacao(num1, num2){
        return num1 * num2
    }
}

let calculation = new Calculadora()

let regexOperadores = /(\d*\.?\d+)(\-|\+|\/|\*)(\d*\.?\d+)/
let rgDiviMult = /(\d*\.?\d+)(\/|\*)(\d*\.?\d+)/
let rgAdiSub = /(\d*\.?\d+)(\+|\-)(\d*\.?\d+)/

function calcula(){
    let result, operationString;
    while(regexOperadores.test(display.value) == true){
        let operation = ''
        if(rgDiviMult.test(display.value)){
            operation = rgDiviMult.exec(display.value)
        }else{
            operation = rgAdiSub.exec(display.value)
        } 

        operationString = operation[0]
        let typeOfOperation = operation[2];
        let firstNumber = Number(operation[1]);
        let lastNumber = Number(operation[3]);

        if(typeOfOperation == '/'){
            result = calculation.divisao(firstNumber, lastNumber) 
        }else if (typeOfOperation == '*'){
            result = calculation.multiplicacao(firstNumber, lastNumber)
        }else if (typeOfOperation == '+'){
            result = calculation.adicao(firstNumber, lastNumber)
        }else if(typeOfOperation == '-'){
            result = calculation.subtracao(firstNumber, lastNumber)
        }else{
            break
        }
        uptdateValue(operationString, result)
    }
    
}
function uptdateValue(oldValue, newValue){
    display.value = display.value.replace(oldValue, newValue)
}


/*
let cal = new Calculadora()

let regexOperadores = /(\d*\.?\d+)(\-|\+|\/|\*)(\d*\.?\d+)/
let rgDiviMult = /(\d*\.?\d+)(\/|\*)(\d*\.?\d+)/
let rgAdiSub = /(\d*\.?\d+)(\+|\-)(\d*\.?\d+)/

function calcula(){
    while(regexOperadores.test(display.value) == true){
        let Operarion = ''
        if(rgDiviMult.test(display.value)){
            Operarion = rgDiviMult.exec(display.value)
        }else{
            Operarion = rgAdiSub.exec(display.value)
        } 

        let typeOfOperation = Operarion[2]
        let firstNumber = Operarion[1]
        let lastNumber = Operarion[3]

        if(typeOfOperation == '/'){
            let result = cal.divisao(Number(firstNumber), Number(lastNumber))
            AtualizaValor(Operarion[0], result)
            
        }else if (typeOfOperation == '*'){
            let result = cal.multiplicacao(Number(firstNumber), Number(lastNumber))
            AtualizaValor(Operarion[0], result)
        }
        else if (typeOfOperation == '+'){
            let result = cal.adicao(Number(firstNumber), Number(lastNumber))
            AtualizaValor(Operarion[0], result)
        }else if(typeOfOperation == '-'){
            let result = cal.subtracao(Number(firstNumber), Number(lastNumber))
            AtualizaValor(Operarion[0], result)
        }
        else{
            break
        }

    }
}
function AtualizaValor(oldValue, newValue){
    display.value = display.value.replace(oldValue, newValue)
}
*/

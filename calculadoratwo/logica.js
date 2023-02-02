let cal = new Calculadora()

let regexOperadores = /(\d*\.?\d+)(\-|\+|\/|\*)(\d*\.?\d+)/


function calcula(){
    while(regexOperadores.test(display.value) == true){
        let Operarion = regexOperadores.exec(display.value)
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
    console.log('O resultado é '+ display.value)
}



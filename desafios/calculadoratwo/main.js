
let button = document.querySelectorAll('.btn');
let display = document.querySelector('.display');

let digitInDisplay = false;

for(let i = 0; i < button.length; i++){
    button[i].addEventListener('click', () => {
        switch (button[i].value) {
            case 'backS':
                bakcSpace();
                break;
            case 'clear':
                clearDisplay();
                break;
            case '=':
                calcula();
                break;
            case '.': 
                addPonto(button[i].value);
                break;
            case '/':
            case '*':
            case '+':
            case '-':
                addOperator(button[i].value)
                break;
            default:
                addNumber(button[i].value)
                break;
        }
    })
};

function addNumber(digitedNumber){
    if(!digitInDisplay){
        display.value =  digitedNumber;
        return digitInDisplay = true;
    }
    display.value += digitedNumber ; 
}

function addPonto(digitedNumber){
    let numbersGroup = display.value.split(/\/|\-|\*|\+/);
    let lastNumber = numbersGroup[numbersGroup.length-1];

    if (lastNumber.includes('.')) return;
    display.value += digitedNumber;
    digitInDisplay = true;
}

function addOperator(digitedNumber){
    /**Checks if the last digit is a number or an operator*/
    let regexLastDigit = /^\d/;
    let lastDigit = display.value.slice(-1);
    if (!regexLastDigit.test(lastDigit)){
        bakcSpace();
    }

    if(display.value.length == 0 ) return;

    display.value += digitedNumber;
    digitInDisplay = true;
}

function bakcSpace(){
    display.value = display.value.slice(0, -1)
}

function clearDisplay(){
    display.value = '0';
    display.style.color = 'black';
    digitInDisplay = false; 
}














/**Codigo anterior ===================================================

let button = document.querySelectorAll('.btn')
let display = document.querySelector('.display')

let regexLastDigit = /^\d/
let digitInDisplay = 0

for(let i = 0; i < button.length; i++){
    button[i].addEventListener('click', () => {
        if(button[i].value == 'backS') return bakcSpace()
        if(button[i].value == 'clear') return ClearDisplay()
        if(button[i].value == '=') return calcula()
        if(button[i].value == '.') return addPonto(button[i].value)
        if(regex.test(button[i].value) == false) return addOperator(button[i].value)
        addNumber(button[i].value)
    })
}
function addNumber(n){
    if(digitInDisplay == 0){
        display.value = display.value = n 
        digitInDisplay = 1
    }else{
        display.value = display.value += n 
    }  
}
function addPonto(n){
    let verifyVirg = display.value.split(/\/|\-|\*|\+/)
    if (verifyVirg[verifyVirg.length-1].includes('.') == true) return
    display.value = display.value += n (what?????????)
    digitInDisplay = 1
}

function addOperator(n){
    console.log('tes')
    let lastValue = display.value.slice(-1)
    if (regex.test(lastValue) == false){
        bakcSpace()
    }
    if(display.value.length == 0 ) return
    
    display.value = display.value += n
    digitInDisplay = 1
}

function bakcSpace(){
    display.value = display.value.slice(0, -1)
}

function ClearDisplay(){
    display.value = '0'
    display.style.color = 'black'
    digitInDisplay = 0
}

class Calculadora{
    adicao(x,y){
        return x + y
    }
    subtracao(x,y){
        return x - y
    }
    divisao(x,y){
        return x / y
    }
    multiplicacao(x,y){
        return x * y
    }
}

*/
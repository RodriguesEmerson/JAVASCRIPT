let leng = 0
let button = document.querySelectorAll('.btn')
let display = document.querySelector('.display')
let regex = /^\d/

for(let i = 0; i < button.length; i++){
    button[i].addEventListener('click', () => {
        if(button[i].value == 'backS') return bakcSpace()
        if(button[i].value == 'clear') return ClearDisplay()
        if(button[i].value == '=') return calcula()
        if(regex.test(button[i].value) == false) return addOperator(button[i].value)
        addNumber(button[i].value)
    })
}
function addNumber(n){
    if(leng == 0){
        display.value = display.value = n 
        leng = 1
    }else{
        display.value = display.value += n 
    }  
}

function addOperator(n){
    let lastValue = display.value.slice(-1)

    if(regex.test(lastValue) == false){
        bakcSpace()
    }
    if(display.value.length == 0 ) return
    display.value = display.value += n
    leng = 1
}

function bakcSpace(){
    display.value = display.value.slice(0, -1)
}

function ClearDisplay(){
    display.value = '0'
    display.style.color = 'black'
    leng = 0
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
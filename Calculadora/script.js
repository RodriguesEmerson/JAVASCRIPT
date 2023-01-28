let butNumber = document.querySelectorAll('.but-Number')
let desc = document.querySelector('.valore')
let tela = document.querySelector('.tela')
let butOperator = document.querySelectorAll('.but-Operator')
tela.textContent = ''
//let clear_tela = document.querySelector('.but-Clear')
let regex = /\d/

for(let ind = 0; ind < butNumber.length; ind++){
    butNumber[ind].addEventListener('click', function(){
       if(tela.textContent.length > 15){
        
       }else{
        tela.textContent += butNumber[ind].value
       }
    })
}

for(let ind = 0; ind < butOperator.length; ind++){
    butOperator[ind].addEventListener('click', function(){

        let count = tela.textContent.length-1
        let lastNumber = tela.textContent[count]
        
        if(tela.textContent.length == 0 || tela.textContent.length > 15){

        }else if(regex.test(lastNumber) != true){
            
            tela.textContent = tela.textContent.toString().slice(0,-1)// apaga o ultimo valor
            tela.textContent += butOperator[ind].value
            
        }else{
            tela.textContent += butOperator[ind].value
        }
    })
}

function Clear(){
    tela.textContent = ''
}

function BackSpace(){

    tela.textContent= tela.textContent.toString().slice(0,-1) // apaga o ultimo valor
}
let square = document.querySelectorAll('.square')


for(let ind = 0; ind < square.length; ind++){
    square[ind].addEventListener('click', () => {
        addPlay(square[ind])
    })
}

//let play = 'User'
function addPlay(which){
    
   //if(play == 'User'){
    which.innerText = 'V'
    //play = 'Machine'
    Winner('V')
    MachinePlay()
   //} else{
    //which.innerText = 'O'
    //play = 'User'
    //Winner('O')
   //}   
   
}

function Winner(v){
    if(square[0].innerText == v && square[1].innerText == v && square[2].innerText == v) return console.log('winner')
    if(square[3].innerText == v && square[4].innerText == v && square[5].innerText == v) return console.log('winner')
    if(square[6].innerText == v && square[7].innerText == v && square[8].innerText == v) return console.log('winner')

    if(square[0].innerText == v && square[3].innerText == v && square[6].innerText == v) return console.log('winner')
    if(square[1].innerText == v && square[4].innerText == v && square[7].innerText == v) return console.log('winner')
    if(square[2].innerText == v && square[5].innerText == v && square[8].innerText == v) return console.log('winner')

    if(square[0].innerText == v && square[4].innerText == v && square[8].innerText == v) return console.log('winner')
    if(square[2].innerText == v && square[4].innerText == v && square[6].innerText == v) return console.log('winner')
}


function MachinePlay(){
    let teste = false
    

    for(let ind = 1; ind < square.length; ind++){
        if(square[ind].innerText == '')  teste = true
    }
    if(teste == true){
        let position = () => {
            min = Math.ceil(0)
            max = Math.floor(8)
            return Math.floor(Math.random() * (max - min) + min)
        }
        posi = position()
       
        while(square[posi].innerText != ''){
           posi = position()
        }
       square[posi].innerText = 'O'
        Winner('O')
    }
    
}


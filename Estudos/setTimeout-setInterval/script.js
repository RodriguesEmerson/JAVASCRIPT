
//setTimeout
function loop(){
   setTimeout(function(){
        console.log('foi')
    }, 3000)
    
}

document.querySelector('.btn').addEventListener('click', () =>{
   loop()
})

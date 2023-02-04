let body = document.querySelector('body')
let square = document.querySelector('.square')
let snake = document.querySelectorAll('.snake')


let dLeft = 0
let dTop = 0
body.addEventListener('keydown', e => {
    
    if (e.key == 'ArrowUp'){
        snake[0].style.top = dTop - 10+'px'
        
        dTop -= 10
    }
    if (e.key == 'ArrowDown'){
        snake[0].style.top = dTop + 10 +'px'
        snake[1].style.left = snake[0].offsetLeft+'px'
        dTop += 10
        goDown()
    }
    if (e.key == 'ArrowRight'){
        snake[0].style.left = dLeft + 10 +'px'
        snake[1].style.top = snake[0].offsetTop+'px'
        dLeft += 10
        goRight()
    }
    if (e.key == 'ArrowLeft'){
        snake[0].style.left = dLeft - 10 +'px'
        
        dLeft -= 10
    }
})

function goRight(){
    for(let i = 1; i < snake.length; i++){
        if(snake[i].offsetTop == snake[i-1].offsetTop){
            snake[i].style.left = snake[i-1].offsetLeft -10 +'px'
        }else{
            if(snake[i].offsetLeft != snake[i-1].offsetLeft){
                snake[i].style.top = snake[i-1].offsetTop +'px'
            }else{
                snake[i].style.top = snake[i-1].offsetTop - 10 +'px'
            }
        }
    }
}
let odTop = ''
let odLeft =''
function goDown(){
    for(let i = 1; i < snake.length; i++){

        if(snake[i].offsetLeft == snake[i-1].offsetLeft){
            snake[i].style.top = snake[i-1].offsetTop - 10 +'px'
            odTop =  snake[i].offsetTop  
            odLeft = snake[i].offsetLeft
        }else{

            snake[i].style.left = snake[i-1].offsetLeft  +'px'
            
        }
        console.log(odTop)  
        console.log(odLeft)
    }
     
        
}
let odLeft = 0
let odTop = 0
let odLeft2 = 0
let odTop2 = 0
let whD = 1
let whR = 1

    // if (e.key == 'ArrowUp'){snake[0].style.top = dTop - 10+'px';
    //     dTop -= 10; goUp(); getAlvo(); bumpedIt(); bumpedItSelf()
    // }
    // if (e.key == 'ArrowDown'){snake[0].style.top = dTop + 10 +'px'; 
    //     dTop += 10; goDown(); getAlvo(); bumpedIt(); bumpedItSelf()
    // }
    // if (e.key == 'ArrowRight'){snake[0].style.left = dLeft + 10 +'px'; 
    //     dLeft += 10; goRight(); getAlvo(); bumpedIt(); bumpedItSelf()
    // }
    // if (e.key == 'ArrowLeft'){snake[0].style.left = dLeft - 10 +'px'; 
    //     dLeft -= 10;  goLeft(); getAlvo(); bumpedIt(); bumpedItSelf()
    // }

    //DEIXAR TODOS ESSES COMANDOS DENTRO DE UM OBJETO


function goRight(){
    for(let i = 1; i < snake.length; i++){
        if([i] == 1){
            whR = 1
            odLeft = snake[i].offsetLeft
            odTop = snake[i].offsetTop

            snake[i].style.top = snake[i-1].offsetTop+'px'
            snake[i].style.left = snake[i-1].offsetLeft -10 +'px'
        }else if(whR == 1){
            odLeft2 = snake[i].offsetLeft
            odTop2 = snake[i].offsetTop

            snake[i].style.left = odLeft+'px'
            snake[i].style.top = odTop+'px'

            whR = 2
        }else if(whR == 2){
            odLeft = snake[i].offsetLeft
            odTop = snake[i].offsetTop

            snake[i].style.left = odLeft2+'px'
            snake[i].style.top = odTop2+'px'

            whR = 1
        }
    }
}
function goLeft(){
    for(let i = 1; i < snake.length; i++){
        if([i] == 1){
            whR = 1
            odLeft = snake[i].offsetLeft
            odTop = snake[i].offsetTop

            snake[i].style.top = snake[i-1].offsetTop+'px'
            snake[i].style.left = snake[i-1].offsetLeft + 10 +'px'
        }else if(whR == 1){
            odLeft2 = snake[i].offsetLeft
            odTop2 = snake[i].offsetTop

            snake[i].style.left = odLeft+'px'
            snake[i].style.top = odTop+'px'

            whR = 2
        }else if(whR == 2){
            odLeft = snake[i].offsetLeft
            odTop = snake[i].offsetTop

            snake[i].style.left = odLeft2+'px'
            snake[i].style.top = odTop2+'px'

            whR = 1
        }
    }
}

function goDown(){
    for(let i = 1; i < snake.length; i++){

        if([i] == 1){
            whD = 1
            odLeft = snake[i].offsetLeft
            odTop = snake[i].offsetTop

            snake[i].style.left = snake[i-1].offsetLeft+'px'
            snake[i].style.top = snake[i-1].offsetTop - 10+'px'
        }else if(whD == 1){
            odLeft2 = snake[i].offsetLeft 
            odTop2 = snake[i].offsetTop 

            snake[i].style.left = odLeft+'px'
            snake[i].style.top = odTop+'px'

            whD = 2
        }else if(whD == 2){
            odLeft = snake[i].offsetLeft 
            odTop = snake[i].offsetTop 

            snake[i].style.left = odLeft2+'px'
            snake[i].style.top = odTop2+'px'

            whD = 1
        }
    }    
}
function goUp(){
    for(let i = 1; i < snake.length; i++){

        if([i] == 1){
            whD = 1
            odLeft = snake[i].offsetLeft
            odTop = snake[i].offsetTop

            snake[i].style.left = snake[i-1].offsetLeft+'px'
            snake[i].style.top = snake[i-1].offsetTop + 10+'px'
        }else if(whD == 1){
            odLeft2 = snake[i].offsetLeft 
            odTop2 = snake[i].offsetTop 

            snake[i].style.left = odLeft+'px'
            snake[i].style.top = odTop+'px'

            whD = 2
        }else if(whD == 2){
            odLeft = snake[i].offsetLeft 
            odTop = snake[i].offsetTop 

            snake[i].style.left = odLeft2+'px'
            snake[i].style.top = odTop2+'px'

            whD = 1
        }
    }    
}
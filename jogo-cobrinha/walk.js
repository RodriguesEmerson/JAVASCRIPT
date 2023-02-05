let dLeft = 0
let dTop = 0
let odLeft = 0
let odTop = 0
let odLeft2 = 0
let odTop2 = 0
let whR = 1
let game = 'playing'
let direction = 3

//============================================
    //setInterval(() => {
    //    if(game == 'game over') return
    //    if(direction == 1) moves.moveUp()
    //    if(direction == 2) moves.moveDown()
    //    if(direction == 3) moves.moveRight()
    //    if(direction == 4) moves.moveLeft()
    //}, 500);
//============================================


let moves ={
    moveUp: () => {
        snake[0].style.top = dTop - 10+'px'; dTop -= 10; direction = 1;
        moveIt(0, -10); getAlvo(); bumpedIt(); bumpedItSelf()
    },
    moveDown: () => {
        snake[0].style.top = dTop + 10 +'px';  dTop += 10; direction = 2;
        moveIt(0, +10); getAlvo(); bumpedIt(); bumpedItSelf()
    },
    moveRight: () => {
        snake[0].style.left = dLeft + 10 +'px'; dLeft += 10; direction = 3;
        moveIt(+10, 0); getAlvo(); bumpedIt(); bumpedItSelf()
    },
    moveLeft: () =>{
        snake[0].style.left = dLeft - 10 +'px'; dLeft -= 10; direction = 4;
        moveIt(-10, 0); getAlvo(); bumpedIt(); bumpedItSelf()
    }
}

function moveIt(x, y){
    for(let i = 1; i < snake.length; i++){ 
        if([i] == 1){
            whR = 1
            odLeft = snake[i].offsetLeft
            odTop = snake[i].offsetTop

            snake[i].style.top = snake[i-1].offsetTop  - y +'px'
            snake[i].style.left = snake[i-1].offsetLeft - x +'px'
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
//=======================================================================
//       COLOQUEI TODOS ESSES COMANDOS DENTRO DE UM OBJETO             //
//=======================================================================

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


//=======================================================================
//          DIMINUI ESSE ESSAS FUNÇÕES PARA APENAS UMA FUNÇÃO          //
//=======================================================================
//let whD = 1
// function goRight(d){
//     for(let i = 1; i < snake.length; i++){ 
//         if([i] == 1){
//             whR = 1
//             odLeft = snake[i].offsetLeft
//             odTop = snake[i].offsetTop

//             snake[i].style.top = snake[i-1].offsetTop  +'px'
//             snake[i].style.left = snake[i-1].offsetLeft - d +'px'
//         }else if(whR == 1){
//             odLeft2 = snake[i].offsetLeft
//             odTop2 = snake[i].offsetTop

//             snake[i].style.left = odLeft+'px'
//             snake[i].style.top = odTop+'px'

//             whR = 2
//         }else if(whR == 2){
//             odLeft = snake[i].offsetLeft
//             odTop = snake[i].offsetTop

//             snake[i].style.left = odLeft2+'px'
//             snake[i].style.top = odTop2+'px'

//             whR = 1
//         }
//     }
// }

// function goDown(d){
//     for(let i = 1; i < snake.length; i++){

//         if([i] == 1){
//             whD = 1
//             odLeft = snake[i].offsetLeft
//             odTop = snake[i].offsetTop

//             snake[i].style.top = snake[i-1].offsetTop - d +'px'
//             snake[i].style.left = snake[i-1].offsetLeft +'px'
//         }else if(whD == 1){
//             odLeft2 = snake[i].offsetLeft 
//             odTop2 = snake[i].offsetTop 

//             snake[i].style.left = odLeft+'px'
//             snake[i].style.top = odTop+'px'

//             whD = 2
//         }else if(whD == 2){
//             odLeft = snake[i].offsetLeft 
//             odTop = snake[i].offsetTop 

//             snake[i].style.left = odLeft2+'px'
//             snake[i].style.top = odTop2+'px'

//             whD = 1
//         }
//     }    
// }

// function goLeft(){
//     for(let i = 1; i < snake.length; i++){
//         if([i] == 1){
//             whR = 1
//             odLeft = snake[i].offsetLeft
//             odTop = snake[i].offsetTop

//             snake[i].style.top = snake[i-1].offsetTop+'px'
//             snake[i].style.left = snake[i-1].offsetLeft + 10 +'px'
//         }else if(whR == 1){
//             odLeft2 = snake[i].offsetLeft
//             odTop2 = snake[i].offsetTop

//             snake[i].style.left = odLeft+'px'
//             snake[i].style.top = odTop+'px'

//             whR = 2
//         }else if(whR == 2){
//             odLeft = snake[i].offsetLeft
//             odTop = snake[i].offsetTop

//             snake[i].style.left = odLeft2+'px'
//             snake[i].style.top = odTop2+'px'

//             whR = 1
//         }
//     }
// }
// function goUp(d){
//     for(let i = 1; i < snake.length; i++){

//         if([i] == 1){
//             whD = 1
//             odLeft = snake[i].offsetLeft
//             odTop = snake[i].offsetTop

//             snake[i].style.left = snake[i-1].offsetLeft+'px'
//             snake[i].style.top = snake[i-1].offsetTop + d +'px'
//         }else if(whD == 1){
//             odLeft2 = snake[i].offsetLeft 
//             odTop2 = snake[i].offsetTop 

//             snake[i].style.left = odLeft+'px'
//             snake[i].style.top = odTop+'px'

//             whD = 2
//         }else if(whD == 2){
//             odLeft = snake[i].offsetLeft 
//             odTop = snake[i].offsetTop 

//             snake[i].style.left = odLeft2+'px'
//             snake[i].style.top = odTop2+'px'

//             whD = 1
//         }
//     }    
// }


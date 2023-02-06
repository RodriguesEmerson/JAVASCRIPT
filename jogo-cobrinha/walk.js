let dLeft = 20
let dTop = 0
let odLeft = 0
let odTop = 0
let odLeft2 = 0
let odTop2 = 0
let whR = 1
let game = 'game over'
let direction = 3
let Dificult = 400
//============================================
    setInterval(() => {
       if(game == 'game over') return
       if(direction == 1) moves.moveUp()
       if(direction == 2) moves.moveDown()
       if(direction == 3) moves.moveRight()
       if(direction == 4) moves.moveLeft()
    }, 250);
//============================================
let moves ={
    moveUp: () => {
        if(invalidMoviment('u') == true) return
        snake[0].style.top = dTop - 10+'px'; dTop -= 10; direction = 1;
        moveIt(0, -10); getAlvo(); bumpedIt(); bumpedItSelf()
    },
    moveDown: () => {
        if(invalidMoviment('d') == true) return
        snake[0].style.top = dTop + 10 +'px';  dTop += 10; direction = 2;
        moveIt(0, +10); getAlvo(); bumpedIt(); bumpedItSelf()
    },
    moveRight: () => {
        if(invalidMoviment('r') == true) return
        snake[0].style.left = dLeft + 10 +'px'; dLeft += 10; direction = 3;
        moveIt(+10, 0); getAlvo(); bumpedIt(); bumpedItSelf()
    },
    moveLeft: () =>{
        if(invalidMoviment('l') == true) return
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

//===========================LOGICA QUE USEI=================================
//Toda vez que um botão de direção é clicado, chama a, agora, função moveIt(),
//fazendo assim um loop/laço, em cada parte do corpo da cobrinha.
//Cada vez que o loop passa por um span, literalmente, ele guarda sua posição
//atual, tanto left quanto top, dentro de variáveis, a odLeft e odTop repecti-
//vamente. Com essa informação guardada, o laço passa por outra parte do corpo
//e, dessa vez salva a posição do span em outras duas variáveis, para não 
//sobrescrever a posição que eu quero que ela passa a ter. O left, dessa vez,
//é guardado na variável odLeft2 e o top na variável odTop2.
//  Com a posição da parte atual do corpo guardada, então aplico a posição
//anteriormente guarda nas variáveis odLeft e odTop. E esse processo é repetido
//para todas as outras partes do corpo da little snake :) !!!
//Os parâmentros x e y passados para a função moveIt(x,y), são basicamente
//quantos pixels quero que seja deslocado em cada direção, x - horizontal
//e y - vertical. Lembrando sempre que - com - é + e + com - é -!!!
//===========================================================================

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


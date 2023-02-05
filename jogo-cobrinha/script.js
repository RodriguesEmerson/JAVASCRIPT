let body = document.querySelector('body')
let square = document.querySelector('.square')
let snake = document.querySelectorAll('.snake')
let alvo = document.querySelector('.alvo')

newPosition()
let game = 'playing'
let dLeft = 0
let dTop = 0

body.addEventListener('keydown', e => {
    if(game == 'game over') return
    if (e.key == 'ArrowUp'){snake[0].style.top = dTop - 10+'px';
        dTop -= 10; goUp(); getAlvo(); bumpedIt(); bumpedItSelf()
    }
    if (e.key == 'ArrowDown'){snake[0].style.top = dTop + 10 +'px'; 
        dTop += 10; goDown(); getAlvo(); bumpedIt(); bumpedItSelf()
    }
    if (e.key == 'ArrowRight'){snake[0].style.left = dLeft + 10 +'px'; 
        dLeft += 10; goRight(); getAlvo(); bumpedIt(); bumpedItSelf()
    }
    if (e.key == 'ArrowLeft'){snake[0].style.left = dLeft - 10 +'px'; 
        dLeft -= 10;  goLeft(); getAlvo(); bumpedIt(); bumpedItSelf()
    }
})

function addNewSnake(){
    let newSnake = document.createElement('span')
    newSnake.setAttribute('class', 'snake')

    square.appendChild(newSnake)
    snake = document.querySelectorAll('.snake')
}

function getAlvo(){
    if(snake[0].offsetLeft == alvo.offsetLeft && snake[0].offsetTop == alvo.offsetTop){
        addNewSnake()
        newPosition()
    }
}

function randPosition(){
    min = Math.ceil(0)
    max = Math.floor(320)
    return Math.floor(Math.random() * (max - min) + min)
}

function newPosition(){
    p = randPosition()
    p = p.toString().slice(0,-1)
    p = p += 0
    alvo.style.left = p+'px'             
  
    p = randPosition()
    p = p.toString().slice(0,-1)
    p = p += 0
    alvo.style.top = p+'px'
}

function bumpedIt(){
    if( snake[0].offsetLeft < 0   ||
        snake[0].offsetTop < 0    ||
        snake[0].offsetLeft > 310 ||
        snake[0].offsetTop > 310  
    ){
        square.style.backgroundColor = 'red'
        game = 'game over'
    }
}
function bumpedItSelf(){
   
    for(let i = 2; i < snake.length; i++){

        if(snake[0].offsetLeft == snake[i].offsetLeft && 
            snake[0].offsetTop == snake[i].offsetTop){
                square.style.backgroundColor = 'red'
                game = 'game over'
        }else{
            
        }
    }
}



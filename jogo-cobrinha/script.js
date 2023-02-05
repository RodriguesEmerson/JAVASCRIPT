let body = document.querySelector('body')
let square = document.querySelector('.square')
let snake = document.querySelectorAll('.snake')
let alvo = document.querySelector('.alvo')

newPosition()

body.addEventListener('keydown', e => {
    if(game == 'game over') return
    if (e.key == 'ArrowUp') moves.moveUp()
    
    if (e.key == 'ArrowDown') moves.moveDown()

    if (e.key == 'ArrowRight') moves.moveRight()

    if (e.key == 'ArrowLeft') moves.moveLeft()
})
//Cria uma nova parte do corpo (novo span no DOM)
function addNewSnake(){
    let newSnake = document.createElement('span')
    newSnake.setAttribute('class', 'snake')

    square.appendChild(newSnake)
    snake = document.querySelectorAll('.snake') 
}
//Verifica se o alvo doi capturado
function getAlvo(){
    if(snake[0].offsetLeft == alvo.offsetLeft && 
        snake[0].offsetTop == alvo.offsetTop){
        addNewSnake()
        newPosition()
    }
}
//Gera uma posição aleatória para o novo alvo
function randPosition(){
    min = Math.ceil(0)
    max = Math.floor(320)
    return Math.floor(Math.random() * (max - min) + min)
}
//Substitui o valor do ultimo indice gerado por 0
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
//Verifica se a snake[0] colidiu com a borda
//do .square
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
//Verifica se a snake[0] colidiu com aguma parte
//do corpo
function bumpedItSelf(){
    for(let i = 2; i < snake.length; i++){

        if(snake[0].offsetLeft == snake[i].offsetLeft && 
            snake[0].offsetTop == snake[i].offsetTop){
                square.style.backgroundColor = 'red'
                game = 'game over'
        }else{ }
    }
}
//Verifica a posição da snake[1], para nao 
//aceitar movimentos dentro de sim mesma
function invalidMoviment(d){
    if(d == 'u'){
        if(snake[1].offsetTop == snake[0].offsetTop - 10 &&
        snake[1].offsetLeft == snake[0].offsetLeft ){
            return true
        }
    }
    if(d == 'r'){
        if(snake[1].offsetLeft == snake[0].offsetLeft + 10 &&
        snake[1].offsetTop == snake[0].offsetTop ){
            return true
        }
    }
    if(d == 'd'){
        if(snake[1].offsetTop == snake[0].offsetTop + 10 &&
        snake[1].offsetLeft == snake[0].offsetLeft ){
            return true
        }
    }
    if(d == 'l'){
        if(snake[1].offsetLeft == snake[0].offsetLeft - 10 &&
        snake[1].offsetTop == snake[0].offsetTop ){
            return true
        }
    }
}

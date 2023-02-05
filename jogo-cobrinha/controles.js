let body = document.querySelector('body')
let bplay = document.querySelector('.bplay')
let btnControl = document.querySelectorAll('.btn-control')

bplay.addEventListener('click', () => {
    Reposition()
    telaInicial.style.visibility = 'hidden'
    game = 'playing'
    
})
body.addEventListener('keydown', e => {
    if(game == 'game over') return
    game = 'game over'
    if (e.key == 'ArrowUp') moves.moveUp()
    
    if (e.key == 'ArrowDown') moves.moveDown()

    if (e.key == 'ArrowRight') moves.moveRight()

    if (e.key == 'ArrowLeft') moves.moveLeft()

    game = 'play'
})
btnControl[0].addEventListener('click', () => {
    if(game == 'game over') return
    moves.moveUp()
})
btnControl[1].addEventListener('click', () => {
    if(game == 'game over') return
    moves.moveDown()

})
btnControl[2].addEventListener('click', () => {
    if(game == 'game over') return
    moves.moveRight()

    
})
btnControl[3].addEventListener('click', () => {
    if(game == 'game over') return
    moves.moveLeft()
    
})
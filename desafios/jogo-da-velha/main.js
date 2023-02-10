let square = document.querySelectorAll('.square')
let btn = document.querySelector('.btn-play')
let namePlayer = document.querySelectorAll('.player-Name')
let start = document.querySelector('.start')
let resp = document.querySelector('.resp')

btn.addEventListener('click', () => {
    start.style.visibility = 'hidden'
    for(i in square){
        square[i].innerText = ''
    }
    if(btn.textContent == 'Play'){
        jogo.players[0] = `${namePlayer[0].value}`
        jogo.players[1] = `${namePlayer[1].value}`
    }
})
for(let ind = 0; ind < square.length; ind++){
    square[ind].addEventListener('click', () => {
        jogo.play(square[ind], jogo.character)
        jogo.checkWinner()
    })
}

let jogo = {
    players: ['',''],
    player: 1,
    character: 'X',
    play: function(s ,v){
        if(s.innerText != '') return
        s.innerText = v;
        this.player = (this.player == 1 ? 0 : 1)
        this.character = (this.character == 'X' ? 'O' : 'X')
    },
    win:[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6],
    ],
    checkWinner: function(v){
        v = (this.player == 0 ? 'X' : 'O')
        for( i in this.win){
            if(square[this.win[i][0]].innerText == v && 
            square[this.win[i][1]].innerText == v && 
            square[this.win[i][2]].innerText == v){
                this.Winner()
                return
            }
        }
        this.checkEmpate()
    },
    empate: false,
    checkEmpate: function(){
        this.empate = false
        for (let i = 0; i < square.length; i++){
            if(square[i].innerText == '') return this.empate = true
        }
        this.Winner()
    },
    Winner: function(){
        start.style.visibility = 'visible'
        namePlayer[0].style.display = 'none'
        namePlayer[1].style.display = 'none'
        resp.style.display = 'block'

        resp.textContent = (this.character == 'O' 
            ? `${this.players[0]} Gangou!` 
            : `${this.players[1]} Gangou!`)

        this.empate == false ? resp.innerText = 'Empate' : ''
        btn.textContent = 'Play Again'
        this.character = 'X'
        this.player = 1;
    }
}

let textBase = document.querySelector('.text-model p');
let btnStart = document.querySelector('#btn-start-again')
let textoDigitado = document.getElementById('text-input')
let minute = document.querySelector('.minute')
let second = document.querySelector('.second')
let start;
let errou = false;
let cronometro;
let caracteresValidos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'x', 'y', 'w', 'z', 'ç', ',', '.', '!',
    '?', ':', 'ã', 'á', 'à', 'â', 'é', 'ê', 'í', 'ú',
    'õ', 'ó', 'ô', ' ','1','2','3','4','5','6','7','8',
    '9','0',
]

textoDigitado.addEventListener('keydown', keyValida)

btnStart.addEventListener('click', startTest)

function startTest(){
    start = true;
    cronometro = setInterval(() => {
        timer()
    }, 1000);
}
function timer(){
    if (second.innerHTML > 0){
        second.innerHTML = second.innerHTML - 1;
        if(second.innerHTML < 10) second.innerHTML = `0${second.innerHTML}`
        console.log(second.innerHTML);
    }
    if(minute.innerHTML > 0 && second.innerHTML == 0 && start){
        console.log(start);
        minute.innerHTML = `0${minute.innerHTML - 1}`;
        second.innerHTML = 59
        start = false;
    }
    if (second.innerHTML == 0 && second.innerHTML == 0){
        clearInterval(cronometro);
        return
    }
    if (second.innerHTML == 0){
        second.innerHTML = 59
    }
}

function keyValida(e) {
    for (let ind = 0; ind < caracteresValidos.length; ind++) {
        if (e.key == caracteresValidos[ind]) {
            verificaMatch(e.key)
            if (errou) {
                e.preventDefault()
            }
            return
        }
        if (e.key == caracteresValidos[ind].toUpperCase()) {
            verificaMatch(e.key)
            if (errou) {
                e.preventDefault()
            }
            return
        }
    }
}

function verificaMatch(e) {
    let caracterAtualIndex = Number(textoDigitado.value.length)
    let caracterAtual = textBase.textContent.charAt(caracterAtualIndex)

    if (e == caracterAtual) {
        textoDigitado.style.color = 'black';
        console.log('Match:' + caracterAtual);
        errou = false;
    } else {
        textoDigitado.style.color = 'red';
        errou = true;
    }

    if(textoDigitado.value.length + 1 == textBase.textContent.length) clearInterval(cronometro)

}
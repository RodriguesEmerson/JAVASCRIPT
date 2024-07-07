let textBase = document.querySelector('.text-model p');
let btnStart = document.querySelector('#btn-start-again')
let textoDigitado = document.getElementById('text-input')
let errou = false;

let caracteresValidos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'x', 'y', 'w', 'z', 'ç', ',', '.', '!',
    '?', ':', 'ã', 'á', 'à', 'â', 'é', 'ê', 'í', 'ú',
    'õ', 'ó', 'ô', ' ',
]

textoDigitado.addEventListener('keydown', keyValida)

function keyValida(e) {
    for (let ind = 0; ind < caracteresValidos.length; ind++) {
        if (e.key == caracteresValidos[ind]) {

            //console.log(caracteresValidos[ind])
            verificaMatch(e.key)
            if (errou) {
                e.preventDefault()
            }
            return
        }
        if (e.key == caracteresValidos[ind].toUpperCase()) {
            //console.log(e.key)
            verificaMatch(e.key)
            if (errou) {
                e.preventDefault()
            }
            return
        }
    }

}

function verificaMatch(e) {
    console.log('*****************')
    let caracterAtualIndex = Number(textoDigitado.value.length)
    let caracterAtual = textBase.textContent.charAt(caracterAtualIndex)

    console.log('Base:' + caracterAtual)
    console.log('Tecla Pressionada:' + e)

    if (e == caracterAtual) {
        textoDigitado.style.color = 'black';
        console.log('Match:' + caracterAtual);
        errou = false;
    } else {
        textoDigitado.style.color = 'red';
        errou = true;
    }

}
let textBase = document.querySelector('.text-model p');
let btnStart = document.querySelector('#btn-start-again')
let textoDigitado = document.getElementById('text-input')
let base = 'd';

btnStart.addEventListener('click', test)
textoDigitado.addEventListener('keydown', verificaMatch())

function test() {
    let caracterAtual = textBase.textContent.charAt(23)
    if (base === caracterAtual) {
        console.log('Igual')
    } else {
        console.log('Atual')
    }
}

function verificaMatch() {
    let caracterAtualNumber = Number(textoDigitado.value.length - 1)
    let caracterAtual = textoDigitado.value.charAt(caracterAtualNumber)
    let caracterAtualBase = textBase.textContent.charAt(caracterAtualNumber + 1)
    let test= KeyboardEvent.length
    console.log(test)

    console.log(`Index: ${caracterAtualNumber} Letra: ${caracterAtual} Base:${caracterAtualBase}`)
}
let infosBox = document.querySelector('.infos')//blur
let textBase = document.querySelector('.text-model p');
let textBaseBox = document.querySelector('.text-model')//blur
let btnStart = document.querySelector('#btn-start-again')
let btnTrocaTexto = document.getElementById('btn-other-text')
let btnCancel = document.getElementById('btn-cancel-text')
let textoDigitado = document.getElementById('text-input')
let textoDigitadoBox = document.querySelector('.text-area')//blur
let minute = document.querySelector('.minute')
let second = document.querySelector('.second')
let modal = document.querySelector('.modal-box')
let btnCloseModal = document.querySelector('.close-modal')
let npmNote = document.querySelector('.npm-note')
let teclasErradas = document.querySelector('.teclas-erradas')
let start;
let errou = false;
let cronometro;
let segundosDigitados = 0;
let arrErros = [];
let caracteresValidos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'x', 'y', 'w', 'z', 'ç', ',', '.', '!',
    '?', ':', 'ã', 'á', 'à', 'â', 'é', 'ê', 'í', 'ú',
    'õ', 'ó', 'ô', ' ', '1', '2', '3', '4', '5', '6', '7', '8',
    '9', '0', 'Backspace',
]

textoDigitado.addEventListener('keydown', keyValida)
btnStart.addEventListener('click', startTest)
btnCancel.addEventListener('click', cancelDigitacao)

function startTest() {
    start = true;
    textoDigitado.focus()
    if (btnStart.value == 'Começar') {
        btnStart.value = 'Pausar'
        cronometro = setInterval(() => {
            timer()
        }, 1000);
    } else {
        btnStart.value = 'Começar'
        clearInterval(cronometro)
    }
}
function timer() {
    segundosDigitados++
    if (second.innerHTML > 0) {
        second.innerHTML = second.innerHTML - 1;
        if (second.innerHTML < 10) second.innerHTML = `0${second.innerHTML}`
        console.log(second.innerHTML);
    }
    if (minute.innerHTML > 0 && second.innerHTML == 0 && start) {
        minute.innerHTML = `0${minute.innerHTML - 1}`;
        second.innerHTML = 59
        start = false;
    }
    if (second.innerHTML == 0 && second.innerHTML == 0) {
        clearInterval(cronometro);
        calculaNpm()
        return
    }
    if (second.innerHTML == 0) {
        second.innerHTML = 59
    }
}

function keyValida(e) {
    if (e.key == 'Backspace') {
        textoDigitado.style.color = 'black';
        errou = false;
        return
    }
    if (errou) {
        e.preventDefault()
        return
    }
    for (let ind = 0; ind < caracteresValidos.length; ind++) {
        if (e.key == caracteresValidos[ind]) {
            verificaMatch(e.key)
            return
        }
        if (e.key == caracteresValidos[ind].toUpperCase()) {
            verificaMatch(e.key)
            return
        }
    }
}

function verificaMatch(e) {
    let caracterAtualIndex = Number(textoDigitado.value.length)
    let caracterAtual = textBase.textContent.charAt(caracterAtualIndex)

    if (e == caracterAtual) {
        textoDigitado.style.color = 'black';
        errou = false;
    } else {
        textoDigitado.style.color = 'red';
        errou = true;
        contaErros(caracterAtual)
    }

    if (textoDigitado.value.length + 1 == textBase.textContent.length){
        clearInterval(cronometro);
        calculaNpm()
    }
}
function contaErros(e){
    if(arrErros.length == 0){
        arrErros.push([e,1]);
    }else{
        for (let ind = 0; ind < arrErros.length; ind++){
            let element = arrErros[ind];
            if(element[0] == e){
                element[1]++
                console.log(arrErros)
                return
            }
        }
        arrErros.push([e,1]);
    }
    console.log(arrErros)
}

function calculaNpm(){
    openCloseModal();
    let minutos = segundosDigitados / 60;
    let npm = textoDigitado.value.length / minutos;
    let Dnpm = npm.toString().split('.');
    console.log(Dnpm)
    npm = Dnpm[0];
    npmNote.innerHTML = npm;
}

function cancelDigitacao() {
    clearInterval(cronometro);
    btnStart.value = 'Começar';
    textoDigitado.value = '';
    minute.innerHTML = '01';
    second.innerHTML = '00';
    start = false;
    segundosDigitados = 0;
}
btnCloseModal.addEventListener('click', openCloseModal);
btnTrocaTexto.addEventListener('click', openCloseModal);
//****FUNCIONALIDADES DO MODAL****/
function openCloseModal(){
    let modalClass = modal.closest('section');

    if(modalClass.classList.contains('hiden')){
        modalClass.classList.remove('hiden');
        infosBox.closest('div').classList.add('blur');
        textBaseBox.closest('div').classList.add('blur');
        textoDigitadoBox.closest('form').classList.add('blur');
    }else{
        modalClass.classList.add('hiden');
        infosBox.closest('div').classList.remove('blur');
        textBaseBox.closest('div').classList.remove('blur');
        textoDigitadoBox.closest('form').classList.remove('blur');
        cancelDigitacao()
    }
}
let textBase = document.querySelector('.text-model p');
let btnStart = document.querySelector('#btn-start-again')
let textoDigitado = document.getElementById('text-input')
let teclaErro
let destacarErro


let caracteresValidos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'x', 'y', 'w', 'z', 'ç', ',', '.', '!',
    '?', ':', 'ã', 'á', 'à', 'â', 'é', 'ê', 'í', 'ú',
    'õ', 'ó', 'ô', ' '
]

textoDigitado.addEventListener('keydown', keyValida)

function keyValida(e) {
    for (let ind = 0; ind < caracteresValidos.length; ind++) {
        if (e.key == caracteresValidos[ind]) {
            //console.log(caracteresValidos[ind])
            verificaMatch(e.key)
            return
        }
        if (e.key == caracteresValidos[ind].toUpperCase()) {
            //console.log(e.key)
            verificaMatch(e.key)
            return
        }
    }
}

function verificaMatch(e) {
    console.log('*****************')
    let caracterAtualIndex = Number(textoDigitado.value.length + 1)
    let caracterAtual = textBase.textContent.charAt(caracterAtualIndex)

    console.log('Base:' + caracterAtual)
    console.log('Tecla Pressionada:' + e)

    if (e == caracterAtual) {
        teclaErro = false;
        textoDigitado.style.color='black';
        console.log('Match:' + caracterAtual);
    }else{
        teclaErro = true;
        textoDigitado.style.color='red';
    }

    if(teclaErro){
        let arrayErro = textBase.textContent.split('')
        arrayErro[caracterAtualIndex] = `<span class = 'errou-essa-tecla'>${caracterAtual}</span>`;
        console.log(arrayErro)
      
        textBase.innerHTML = arrayErro.toString();
        console.log(textBase.innerHTML)
        //destacarErro = document.querySelectorAll('.errou-essa-tecla');
        //destacarErro.style.color= 'red';
    }
}
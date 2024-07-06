let textBase = document.querySelector('.text-model p');
let btnStart = document.querySelector('#btn-start-again')

btnStart.addEventListener('click', test)

function test(){
    console.log(textBase.textContent.length)
}
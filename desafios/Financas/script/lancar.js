import { criar } from './script.js';
import { categorias } from './modules/dados.js';
const form = document.querySelector('.dados-box');
const selectCategorias = document.querySelector('#lancar-categoria');
const formBox = document.querySelector('.lancar-container');
const abirForm = document.querySelector('#abir-lancar');    
const fecharForm = document.querySelector('#fechar-form');

function carregaCategorias(){
    categorias[0].forEach(element => {
        const option = criar('option');
        option.setAttribute('value', element);
        option.innerText = element;
        selectCategorias.appendChild(option);
    })
}
form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData);
    console.log(dados)
});
abirForm.addEventListener('click', () =>{
    formBox.classList.remove('hidden')
})
fecharForm.addEventListener('click', () =>{
    formBox.classList.add('hidden');
})
carregaCategorias()
import { criar } from './script.js';
import { todosOsDados, categorias } from './modules/dados.js';
const form = document.querySelector('.dados-box');
const selectCategorias = document.querySelector('#lancar-categoria');
const formBox = document.querySelector('.lancar-container');
const abirForm = document.querySelector('#abir-lancar');
const fecharForm = document.querySelector('#fechar-form');

abirForm.addEventListener('click', () => {
    formBox.classList.remove('hidden')
    carregaCategorias()
})

fecharForm.addEventListener('click', () => {
    formBox.classList.add('hidden');
})

form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const dados = Object.fromEntries(formData);
    const novoLancamento = novoDado(dados)

    todosOsDados[dados.tipo][2024]['JAN'].push(novoLancamento);
    // console.log(todosOsDados[dados.tipo][2024]['JAN']);
});

function carregaCategorias() {
    categorias[0].forEach(element => {
        const option = criar('option');
        option.setAttribute('value', element);
        option.innerText = element;
        selectCategorias.appendChild(option);
    })
}

function novoDado(dados) {
    let ordem = ['desc', 'data', 'categoria', 'valor'];
    if (dados.tipo != 'despesas') ordem = ['desc', 'data', 'valor'];
    let obj = {}
    ordem.forEach(element => {
        obj[element] = dados[element]
    })
    obj.id = radomID(2024, 'JAN');
    return obj
}

function radomID(ano, mes) {
    let min = Math.ceil(10);
    let max = Math.floor(1000);
    let id = Math.floor(Math.random() * (max - min) + min);
    let newId = `${ano}${mes}${id}`
    return newId;
}


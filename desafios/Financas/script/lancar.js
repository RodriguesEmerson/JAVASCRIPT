import { criar } from './script.js';
import { todosOsDados ,categorias } from './modules/dados.js';
const form = document.querySelector('.dados-box');
const selectCategorias = document.querySelector('#lancar-categoria');
const formBox = document.querySelector('.lancar-container');
const abirForm = document.querySelector('#abir-lancar');
const fecharForm = document.querySelector('#fechar-form');
let id = 10;

abirForm.addEventListener('click', () => {
    formBox.classList.remove('hidden')
    carregaCategorias()
})
fecharForm.addEventListener('click', () => {
    formBox.classList.add('hidden');
})
function carregaCategorias() {
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
    const novoLancamento = novoDado(dados, id)
    todosOsDados[dados.tipo][2024]['JAN'].push(novoLancamento)
    console.log(novoLancamento)
    console.log(todosOsDados[dados.tipo][2024]['JAN'])
    
});

function novoDado (dados, id){
    // let descricao = dados.descricao
    // let data = dados.data;
    // let categoria = dados.categoria;
    // let valor = dados.valor
    // let idd = id;
    // const obj = {descricao, data, categoria, valor, idd}
}


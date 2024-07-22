import { criar, carregaTabelas } from './script.js';
import { baseDeDados, categorias } from './modules/dados.js';
const form = document.querySelector('.dados-box');
const selectCategorias = document.querySelector('#lancar-categoria');
const formBox = document.querySelector('.lancar-container');
const abirForm = document.querySelector('#abir-lancar');
const fecharForm = document.querySelector('#fechar-form');
const radiosTipo = document.getElementsByTagName('tipo');
const txtDescricao = document.getElementById('lancar-descricao');
const txtData = document.getElementById('lancar-data');
const txtCategoria = document.getElementById('lancar-categoria');
const txtValor = document.getElementById('lancar-valor');
let categoriasCarregadas = false;

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
    const novoDado = criaObjNovoDado(dados);

    baseDeDados[dados.tipo][2024]['JAN'].push(novoDado);
    carregaTabelas.insereDados(dados.tipo)
});

function carregaCategorias() {
    if(!categoriasCarregadas){
        categorias[0].forEach(element => {
            const option = criar('option');
            option.setAttribute('value', element);
            option.innerText = element;
            selectCategorias.appendChild(option);
            categoriasCarregadas = true;
        });
    };
};

function criaObjNovoDado(dados) {
    let ordem = ['desc', 'data', 'categoria', 'valor'];
    if (dados.tipo != 'despesas') ordem = ['desc', 'data', 'valor'];
    let obj = {};
    ordem.forEach(element => {
        obj[element] = dados[element];
    });
    obj.id = radomID(2024, obj.data);
    return obj;
};

function radomID(ano, data) {
    let min = Math.ceil(10);
    let max = Math.floor(1000);
    let id = Math.floor(Math.random() * (max - min) + min);
    let newId = `${ano}${data}${id}`;
    return newId;
}

/******PROXIMO PASSOS*********
/ /Validar os dados lançados;
/ /Mudar categorias de acordo o tipo de lançamento selecionado;
/ /Tamanho máximo e mínimo das td's das tables;
/ /Pegar mês da data para lancar na base de dados de acordo o mês;
/ /Trasformar essas funções em objetos e métodos;
*/
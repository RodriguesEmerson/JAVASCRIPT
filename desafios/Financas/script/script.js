const tabelaDespesas = document.querySelector('.despesas-tabela');
const tabelaReceitas = document.querySelector('.receitas-tabela');
const tabelaFixos = document.querySelector('.fixos-tabela');
const deleteBox = document.querySelector('#deleteBox');
const btnApagar = document.querySelector('#deletar-btn');
let deleteBoxSlide;
let ano = 2024;
let mes = 'JAN';

import { todosOsDados } from "./modules/dados.js";

carregaTabelas2('despesas', 2024, 'JAN', todosOsDados, tabelaDespesas)
carregaTabelas2('receitas', 2024, 'JAN', todosOsDados, tabelaReceitas)
carregaTabelas2('fixos', 2024, 'JAN', todosOsDados, tabelaFixos)

function carregaTabelas2(tabela, ano, mes, dados, tabelaHTML) {
    dados[tabela][ano][mes].forEach(element => {
        const tr = criar('tr')
        for (const chave in element) {
            if(chave == 'id'){
                tr.setAttribute('id',`${element[chave]}`)
            }else{
                let td = criar('td');
                td.textContent = element[chave]
                if(chave == 'valor'){
                    td.textContent = formataMoeda(element[chave])
                }
                tr.appendChild(td)
            }
        }
        tabelaHTML.appendChild(tr)
    })
    somaValores(tabela, ano, mes, dados)
}

function somaValores(tabela, ano, mes,dados){
    let total= 0;
    dados[tabela][ano][mes].forEach(element => {
        total = total + Number(element.valor)
    })
    const totalTabela = document.getElementById(`total-${tabela}`);
    total = formataMoeda(total);
    totalTabela.textContent = total;
}

export function criar(tipo) {
    return document.createElement(`${tipo}`)
}

function formataMoeda(valor){
    return Number(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

//*****************APAGAR DADOS*******************/
tabelaDespesas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    apagarDado(event, 'despesas')
})
tabelaReceitas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    apagarDado(event, 'receitas')
})
tabelaFixos.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    apagarDado(event, 'fixos');
})
btnApagar.addEventListener('click', (event) => {
    deleteBoxSlide = event.target.closest('div');
    deleteBoxSlide.style.marginLeft = '-205px'
})
document.querySelector('#deletar-nao').addEventListener('click', () => {
    deleteBox.classList.add('hidden');
    deleteBoxSlide.style.marginLeft = '0px'
})

function apagarDado(event, tabela) {
    deleteBox.classList.remove('hidden');

    let left = event.clientX;
    let top = event.clientY;
    deleteBox.style.left = `${left + 3}px`;
    deleteBox.style.top = `${top - 45}px`;

    let tr = event.target.closest('tr');
    let trID = event.target.closest('tr').getAttribute('id');
    let tabelaPai = tr.closest('table');
    let objNaBaseDeDados;
    todosOsDados[tabela][ano][mes].forEach(element => {
        if (element.id == trID) objNaBaseDeDados = element;
    });
    console.log(objNaBaseDeDados);

    console.log(event)
    console.log(tr)
    console.log('left: ' + left, 'Top: ' + top)
}
const tabelaDespesas = document.querySelector('.despesas-tabela');
const tabelaReceitas = document.querySelector('.receitas-tabela');
const tabelaFixos = document.querySelector('.fixos-tabela');
const btnApagar = document.querySelector('#deletar-btn');
let ano = 2024;
let mes = 'JAN';

import { todosOsDados } from "./modules/dados.js"

export function criar(tipo) {
    return document.createElement(`${tipo}`)
}

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

function formataMoeda(valor){
    return Number(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

tabelaDespesas.addEventListener('contextmenu', (event) =>{
        event.preventDefault();
        apagarDado(event, 'despesas') 
})
tabelaReceitas.addEventListener('contextmenu', (event) =>{
        event.preventDefault();
        apagarDado(event, 'receitas') 
})
tabelaFixos.addEventListener('contextmenu', (event) =>{
        event.preventDefault();
        apagarDado(event, 'fixos');
})

btnApagar.addEventListener('click', (event) =>{
    let btnBox = event.target.closest('div');
    btnBox.style.marginLeft = '-205px'
})

function apagarDado(event, tabela){
    let tr = event.target.closest('tr');
    let trID = event.target.closest('tr').getAttribute('id');
    let tabelaPai = tr.closest('table');
    let objNaBaseDeDados;
    todosOsDados[tabela][ano][mes].forEach(element =>{
        if(element.id == trID) objNaBaseDeDados = element;
    });
    console.log(objNaBaseDeDados);

    console.log(trID)
    console.log(tr)
    console.log(tabelaPai)
}
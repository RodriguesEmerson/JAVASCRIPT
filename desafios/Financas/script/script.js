const tabelaDespesas = document.querySelector('.despesas-tabela');
const tabelaReceitas = document.querySelector('.receitas-tabela');
const tabelaFixos = document.querySelector('.fixos-tabela');

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
    console.log(`${tabela}: ` + total)
}
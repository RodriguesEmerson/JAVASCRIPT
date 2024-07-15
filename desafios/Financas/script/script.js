const tabelaDespesas = document.querySelector('.despesas-tabela')
const tabelaReceitas = document.querySelector('.receitas-tabela');
const tabelaFixos = document.querySelector('.fixos-tabela');
import  {dadosDespesas, dadosReceitas, dadosFixos} from "./modules/dados.js"

function carregaDespesas(){
    carregaTabelas(tabelaDespesas, 4, dadosDespesas)
}
function carregaReceitas(){
    carregaTabelas(tabelaReceitas, 3, dadosReceitas)
}
function carregaFixos(){
    carregaTabelas(tabelaFixos, 3, dadosFixos)
}

function carregaTabelas(tabela, colunas, dados){
    tabela.innerText = '';
    let titulos = 0;
    dados.forEach(element => {
        const tr = criar('tr')
        element.forEach(element =>{
            let td = criar('td');
            if(titulos < colunas) td = criar('th');
            td.innerText = element;
            tr.appendChild(td)
            titulos++;
        })
        tabela.appendChild(tr)
    });
}

function criar(tipo){
    return document.createElement(`${tipo}`)
}
carregaDespesas()
carregaReceitas()
carregaFixos()
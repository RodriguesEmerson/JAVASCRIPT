const tabelaDespesas = document.querySelector('.despesas-tabela');
const tabelaReceitas = document.querySelector('.receitas-tabela');
const tabelaFixos = document.querySelector('.fixos-tabela');
const deleteBox = document.querySelector('#deleteBox');
const btnApagar = document.querySelector('#deletar-btn');
const btnApagarNao = document.querySelector('#deletar-nao');
const btnApagarSim = document.querySelector('#deletar-sim');
let deleteBoxSlide;
let ano = 2024;
let mes = 'JAN';

import { todosOsDados } from "./modules/dados.js";

const carregaTabelas = {
    insereDados: function(tabela, ano, mes, dados, tabelaHTML){
        dados[tabela][ano][mes].forEach(element => {
            const tr = criar('tr')
            for (const chave in element) {
                if(chave == 'id'){
                    tr.setAttribute('id',`${element[chave]}`)
                }else{
                    let td = criar('td');
                    td.textContent = element[chave]
                    if(chave == 'valor'){
                        td.textContent = this.formataMoeda(element[chave])
                    }
                    tr.appendChild(td)
                }
            }
            tabelaHTML.appendChild(tr)
        })
        this.somaValores(tabela, ano, mes, dados)
    },

    somaValores: function(tabela, ano, mes, dados){
        let total= 0;
        dados[tabela][ano][mes].forEach(element => {
            total = total + Number(element.valor)
        })
        const totalTabela = document.getElementById(`total-${tabela}`);
        total = this.formataMoeda(total);
        totalTabela.textContent = total;
    },

    formataMoeda: function(valor){
        return Number(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }
}

export function criar(tipo) {
    return document.createElement(`${tipo}`)
}

//*****************APAGAR DADOS*******************/
btnApagar.addEventListener('click', (event) => {
    deleteBoxSlide = event.target.closest('div');
    deleteBoxSlide.style.marginLeft = '-205px'
})

btnApagarNao.addEventListener('click', () => {
    deleteBox.classList.add('hidden');
    deleteBoxSlide.style.marginLeft = '0px';
})
btnApagarSim.addEventListener('click', () => {
    apagarDado.apagar();
    deleteBox.classList.add('hidden');
    deleteBoxSlide.style.marginLeft = '0px';
})

const apagarDado = {
    tabelasDOM: [tabelaDespesas, tabelaReceitas, tabelaFixos],
    dadosClicados:{},
    addEvents: function(){
        this.tabelasDOM.forEach(element =>{
            element.addEventListener('contextmenu', (event) =>{
                event.preventDefault();
                deleteBox.classList.remove('hidden');
                let left = event.clientX;
                let top = event.clientY;
                deleteBox.style.left = `${left + 3}px`;
                deleteBox.style.top = `${top - 45}px`;
                this.selecionarDadosClicados(event);
            });
        });
    },
    selecionarDadosClicados: function (event){
        //*****Busca Elementos do DOM******/
        let tabela;
        const tabelaClicada = event.target.closest('table');
        const classeDaTabela = tabelaClicada.classList[1];
        const trClicada = event.target.closest('tr');
        const trClicadaID = trClicada.closest('tr').getAttribute('id');

        switch (classeDaTabela) {
            case 'despesas-tabela':
                tabela = 'despesas';
                break;
            case 'receitas-tabela':
                tabela = 'receitas';
                break;
            default: tabela = 'fixos';
                break;
        };

        //*****Busca Objeto da Base de Dados******/
        let objNaBaseDeDados;
        todosOsDados[tabela][ano][mes].forEach(element => {
            if (element.id == trClicadaID) objNaBaseDeDados = element;
        });
        
        this.dadosClicados.tabelaClicada = tabelaClicada;
        this.dadosClicados.trClicada = trClicada;
        this.dadosClicados.tabela = tabela;
        this.dadosClicados.obj = objNaBaseDeDados;

    },
    apagar: function(){
        this.dadosClicados.tabelaClicada.removeChild(this.dadosClicados.trClicada)
        let index = todosOsDados[this.dadosClicados.tabela][ano][mes].indexOf(this.dadosClicados.obj);
        todosOsDados[this.dadosClicados.tabela][ano][mes].splice(index, 1)
        console.log(todosOsDados[this.dadosClicados.tabela][ano][mes])
        console.log(index)
    }
}
apagarDado.addEvents();

carregaTabelas.insereDados('despesas', 2024, 'JAN', todosOsDados, tabelaDespesas);
carregaTabelas.insereDados('receitas', 2024, 'JAN', todosOsDados, tabelaReceitas);
carregaTabelas.insereDados('fixos', 2024, 'JAN', todosOsDados, tabelaFixos);
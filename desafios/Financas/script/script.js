const tabelaDespesas = document.querySelector('.despesas-tabela');
const tabelaReceitas = document.querySelector('.receitas-tabela');
const tabelaFixos = document.querySelector('.fixos-tabela');
const deleteBox = document.querySelector('#deleteBox');
const btnApagar = document.querySelector('#deletar-btn');
const btnApagarNao = document.querySelector('#deletar-nao');
const btnApagarSim = document.querySelector('#deletar-sim');
const container = document.querySelector('.container');
let deleteBoxSlide; //será a div dentro da caixa 'pop up' deletar;


import { baseDeDados } from "./modules/dados.js";
import { ano, mes } from "./modules/navigation.js";


export const carregaTabelas = {
    insereDados: function(tabela){
        let tabelaHTML;
        switch (tabela) {
            case 'despesas':
                tabelaHTML = tabelaDespesas;
                break;
            case 'receitas':
                tabelaHTML = tabelaReceitas;
                break;
        
            default: tabelaHTML = tabelaFixos;
                break;
        };
        this.limpaTabelaHTML(tabela, tabelaHTML);
        baseDeDados[tabela][ano][mes].forEach(element => {
            const tr = criar('tr');
            for (const chave in element) {
                if(chave == 'id'){
                    tr.setAttribute('id',`${element[chave]}`);
                }else{
                    let td = criar('td');
                    td.textContent = element[chave];
                    if(chave == 'valor'){
                        td.textContent = this.formataMoeda(element[chave]);
                    }
                    tr.appendChild(td);
                };
            };
            tabelaHTML.appendChild(tr);
        })
        this.somaValores(tabela, ano, mes);
    },
    limpaTabelaHTML: function (tabela, tabelaHTML){
        let cabecalhos = ['DESCRIÇÃO', 'DATA', 'CATEGORIA', 'VALOR'];
        if(tabela != 'despesas') cabecalhos = ['DESCRIÇÃO', 'DATA', 'VALOR'];
        const tr = criar('tr');
        cabecalhos.forEach(element =>{
            const th = criar('th');
            th.textContent = element;
            tr.appendChild(th);
        });
        tabelaHTML.innerHTML = '';
        tabelaHTML.appendChild(tr);
    },

    somaValores: function(tabela, ano, mes){
        let total= 0;
        baseDeDados[tabela][ano][mes].forEach(element => {
            total = total + Number(element.valor);
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
    //Adiciona eventos em cada td das tabelas;
    addEvents: function(){
        this.tabelasDOM.forEach(element =>{
            element.addEventListener('contextmenu', (event) =>{
                event.preventDefault();
                deleteBox.classList.remove('hidden');
                let telaWidth = window.innerWidth;
                let telaHeight = window.innerHeight;
                let left = event.x; //"x e y": refenrente ao browser;  
                let top = event.pageY; //referente ao scroll;
                if(left + 220 > telaWidth) { left = left - 205 }
                if(event.y + 105 > telaHeight) { top = top - 105; console.log('foi')};
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
        baseDeDados[tabela][ano][mes].forEach(element => {
            if (element.id == trClicadaID) objNaBaseDeDados = element;
        });
        
        this.dadosClicados.tabelaClicada = tabelaClicada;
        this.dadosClicados.trClicada = trClicada;
        this.dadosClicados.tabela = tabela;
        this.dadosClicados.obj = objNaBaseDeDados;

    },
    apagar: function(){
        this.dadosClicados.tabelaClicada.removeChild(this.dadosClicados.trClicada)
        let index = baseDeDados[this.dadosClicados.tabela][ano][mes].indexOf(this.dadosClicados.obj);
        baseDeDados[this.dadosClicados.tabela][ano][mes].splice(index, 1);
        carregaTabelas.somaValores(this.dadosClicados.tabela, ano, mes, baseDeDados)
    }
}
apagarDado.addEvents();
carregaTabelas.insereDados('despesas');
carregaTabelas.insereDados('receitas');
carregaTabelas.insereDados('fixos');
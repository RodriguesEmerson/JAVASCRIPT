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
    
    insereDados: function(tabelaBD){
        if(baseDeDados == '') return;
        let tabelaDOM = this.selecionaTabelaNoDOM(tabelaBD);
        
        this.formataTabelaDOM(tabelaBD, tabelaDOM);

        //Cria so elementos <tr> e <td> nas tabelas do DOM
        baseDeDados[tabelaBD][ano][mes].forEach(element => {
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
            tabelaDOM.appendChild(tr);
        })
        this.somaTotalDaTabela(tabelaBD, ano, mes);
        this.addEventClickDireito();
    },

    selecionaTabelaNoDOM: function(tabelaBD){
        switch (tabelaBD) {
            case 'despesas':
                return tabelaDespesas;
            case 'receitas':
                return tabelaReceitas;
            default: return tabelaFixos;
        };
    },

    formataTabelaDOM: function (tabelaBD, tabelaDOM){
        let cabecalhos = ['DESCRIÇÃO', 'DATA', 'CATEGORIA', 'VALOR'];
        if(tabelaBD != 'despesas') cabecalhos = ['DESCRIÇÃO', 'DATA', 'VALOR'];
        const tr = criar('tr');
        cabecalhos.forEach(element =>{
            const th = criar('th');
            th.setAttribute('scope', 'col')
            th.textContent = element;
            tr.appendChild(th);
        });
        tabelaDOM.innerHTML = '';
        tabelaDOM.appendChild(tr);
    },

    somaTotalDaTabela: function(tabelaBD, ano, mes){
        let total= 0;
        baseDeDados[tabelaBD][ano][mes].forEach(element => {
            total = total + Number(element.valor);
        })
        const totalTabela = document.getElementById(`total-${tabelaBD}`);
        total = this.formataMoeda(total);
        totalTabela.textContent = total;
    },
     //Adiciona eventos em cada td das tabelas;
     addEventClickDireito: function(){
        let tabelasDOM = [tabelaDespesas, tabelaReceitas, tabelaFixos];
        tabelasDOM.forEach(element =>{
            element.addEventListener('contextmenu', (event) =>{
                event.preventDefault();
                deleteBox.classList.remove('hidden');
                let telaWidth = window.innerWidth;
                let telaHeight = window.innerHeight;
                let left = event.x; //"x e y": se refenre ao browser;  
                let top = event.pageY; //se refere ao scroll;
                if(left + 220 > telaWidth) { left = left - 205 }
                if(event.y + 105 > telaHeight) { top = top - 105; console.log('foi')};
                deleteBox.style.left = `${left + 3}px`;
                deleteBox.style.top = `${top - 45}px`;

                apagarDado.selecionarDadosClicados(event)
            });
        });
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
    elementosDOMClicados:{},
    selecionarDadosClicados: function (event){
        //*****Busca Elementos do DOM******/
        let tabelaDB;
        const tabelaDOMClicada = event.target.closest('table');
        const classeDaTabela = tabelaDOMClicada.classList[1];
        const trClicada = event.target.closest('tr');
        const trClicadaID = trClicada.closest('tr').getAttribute('id');

        //Nome da tabela na BaseDeDados
        switch (classeDaTabela) {
            case 'despesas-tabela':
                tabelaDB = 'despesas';
                break;
            case 'receitas-tabela':
                tabelaDB = 'receitas';
                break;
            default: tabelaDB = 'fixos';
                break;
        };

        //*****Busca Objeto da Base de Dados******/
        let objNaBaseDeDados;
        baseDeDados[tabelaDB][ano][mes].forEach(element => {
            if (element.id == trClicadaID) objNaBaseDeDados = element;
        });
        
        this.elementosDOMClicados.tabelaDOMClicada = tabelaDOMClicada;
        this.elementosDOMClicados.trClicada = trClicada;
        this.elementosDOMClicados.tabelaDB = tabelaDB;
        this.elementosDOMClicados.obj = objNaBaseDeDados;

    },
    apagar: function(){
        let index = baseDeDados[this.elementosDOMClicados.tabelaDB][ano][mes]
            .indexOf(this.elementosDOMClicados.obj);

        this.elementosDOMClicados.tabelaDOMClicada
            .removeChild(this.elementosDOMClicados.trClicada);

        baseDeDados[this.elementosDOMClicados.tabelaDB][ano][mes]
            .splice(index, 1);

        carregaTabelas.somaTotalDaTabela(this.elementosDOMClicados.tabelaDB, ano, mes, baseDeDados)
    }
}
carregaTabelas.insereDados('despesas');
carregaTabelas.insereDados('receitas');
carregaTabelas.insereDados('fixos');
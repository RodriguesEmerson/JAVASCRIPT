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
import { ano, mes, carregaLinksNav } from "./navigation.js";

export const carregaTabelas = {
    insereDados: function (tabelaBD) {
        try{
            let tabelaDOM = this.selecionaTabelaNoDOM(tabelaBD);
            this.formataTabelaDOM(tabelaBD, tabelaDOM);
    
            //Cria so elementos <tr> e <td> nas tabelas do DOM
            baseDeDados[ano][mes][tabelaBD].forEach(element => {
                const tr = criar('tr');
                for (const chave in element) {
                    if (chave == 'id') {
                        tr.setAttribute('id', `${element[chave]}`);
                    } else {
                        let td = criar('td');
                        td.textContent = element[chave];
                        if (chave == 'valor') {
                            td.textContent = this.formataMoeda(element[chave]);
                        }
                        tr.appendChild(td);
                    };
                };
                tabelaDOM.appendChild(tr);
            })
            this.somaTotalDaTabela(ano, mes, tabelaBD);
            this.addEventClickDireito();
        }catch(error){
            console.error()
        }
       
    },

    selecionaTabelaNoDOM: function (tabelaBD) {
        switch (tabelaBD) {
            case 'despesas':
                return tabelaDespesas;
            case 'receitas':
                return tabelaReceitas;
            default: return tabelaFixos;
        };
    },

    formataTabelaDOM: function (tabelaBD, tabelaDOM) {
        let cabecalhos = ['DESCRIÇÃO', 'DATA', 'CATEGORIA', 'VALOR'];
        if (tabelaBD != 'despesas') cabecalhos = ['DESCRIÇÃO', 'DATA', 'VALOR'];
        const tr = criar('tr');
        cabecalhos.forEach(element => {
            const th = criar('th');
            th.setAttribute('scope', 'col')
            th.textContent = element;
            tr.appendChild(th);
        });
        tabelaDOM.innerHTML = '';
        tabelaDOM.appendChild(tr);
    },

    somaTotalDaTabela: function (ano, mes, tabelaBD) {
        let total = 0;
        baseDeDados[ano][mes][tabelaBD].forEach(element => {
            total = total + Number(element.valor);
        })
        const totalTabela = document.getElementById(`total-${tabelaBD}`);
        totalTabela.textContent = this.formataMoeda(total);
    },
    
    //Adiciona eventos em cada tr das tabelas;
    addEventClickDireito: function () {
        let tabelasDOM = [tabelaDespesas, tabelaReceitas, tabelaFixos];
        tabelasDOM.forEach(element => {
            element.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                deleteBox.classList.remove('hidden');
                let telaWidth = window.innerWidth;
                let telaHeight = window.innerHeight;
                let left = event.x; //"x e y": se refenre ao browser;  
                let top = event.pageY; //se refere ao scroll;
                if (left + 220 > telaWidth) { left = left - 205 }
                if (event.y + 105 > telaHeight) { top = top - 105; console.log('foi') };
                deleteBox.style.left = `${left + 3}px`;
                deleteBox.style.top = `${top - 45}px`;

                apagarDado.selecionarDadosClicados(event)
            });
        });
    },

    formataMoeda: function (valor) {
        return Number(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }
}

const apagarDado = {
    elementoClicado: {},
    selecionarDadosClicados: function (event) {
        //*****Busca Elementos do DOM******/
        let tabelaBD;
        const tabelaDOMClicada = event.target.closest('table');
        const classeDaTabela = tabelaDOMClicada.classList[1];
        const trClicada = event.target.closest('tr');
        const trClicadaID = trClicada.closest('tr').getAttribute('id');

        //Nome da tabela na BaseDeDados
        switch (classeDaTabela) {
            case 'despesas-tabela':
                tabelaBD = 'despesas';
                break;
            case 'receitas-tabela':
                tabelaBD = 'receitas';
                break;
            default: tabelaBD = 'fixos';
                break;
        };

        //*****Busca Objeto da Base de Dados******/
        let objNaBaseDeDados;
        baseDeDados[ano][mes][tabelaBD].forEach(element => {
            if (element.id == trClicadaID) objNaBaseDeDados = element;
        });

        this.elementoClicado.tabelaDOMClicada = tabelaDOMClicada;
        this.elementoClicado.trClicada = trClicada;
        this.elementoClicado.tabelaBD = tabelaBD;
        this.elementoClicado.objNaBaseDeDados = objNaBaseDeDados;
    },
    apagar: function () {
        //Os dados já foram selecionados pelo event 'contextmenu' de 
        //cada tr, criados em carregarTabelas.addEventClickDireito.
        let index = baseDeDados[ano][mes][this.elementoClicado.tabelaBD]
            .indexOf(this.elementoClicado.objNaBaseDeDados);
            console.log(this.elementoClicado.objNaBaseDeDados)

        this.elementoClicado.tabelaDOMClicada
            .removeChild(this.elementoClicado.trClicada);

        baseDeDados[ano][mes][this.elementoClicado.tabelaBD].splice(index, 1);

        carregaTabelas.somaTotalDaTabela(ano, mes, this.elementoClicado.tabelaBD)
    }
}

export function criar(tipo) {
    return document.createElement(`${tipo}`);
}


btnApagar.addEventListener('click', (event) => {
    deleteBoxSlide = event.target.closest('div');
    deleteBoxSlide.style.marginLeft = '-205px'
});

btnApagarNao.addEventListener('click', () => {
    deleteBox.classList.add('hidden');
    deleteBoxSlide.style.marginLeft = '0px';
});

btnApagarSim.addEventListener('click', () => {
    apagarDado.apagar();
    deleteBox.classList.add('hidden');
    deleteBoxSlide.style.marginLeft = '0px';
});

container.addEventListener('click', (event) => {
    //Fecha a DeleteBox se for clicado fora dela.
    const classes = ['deleteBox', 'slide', 'delete-box-confirm', 'deleteBox-buttons'];
    
    if(event.target.classList.contains('slide')) return;
    
    for(const classe of classes){
        if(event.target.parentElement.classList.contains(classe)){
            return;
        };
    };

    if(!deleteBox.classList.contains('hidden')){
        deleteBox.classList.add('hidden');
        deleteBoxSlide.style.marginLeft = '0px';
    };
});

carregaTabelas.insereDados('despesas');
carregaTabelas.insereDados('receitas');
carregaTabelas.insereDados('fixos');
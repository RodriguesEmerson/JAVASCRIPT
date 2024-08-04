const tabelaDespesas = document.querySelector('.despesas-tabela');
const tabelaReceitas = document.querySelector('.receitas-tabela');
const tabelaFixos = document.querySelector('.fixos-tabela');
const deleteBox = document.querySelector('#deleteBox');
const btnApagar = document.querySelector('#deletar-btn');
const btnApagarNao = document.querySelector('#deletar-nao');
const btnApagarSim = document.querySelector('#deletar-sim');
const container = document.querySelector('.container');
const dashBoard = document.querySelector('.dash-board');
let deleteBoxSlide; //será a div dentro da caixa 'pop up' deletar;

import { carregaTabelas, ano, mes, } from "./modules/utils.js";
import { baseDeDados } from "./modules/dados.js";
import { novoLancamento } from "./lancar.js";
import { carregaGraficos } from "./graficos.js";

//Organiza os dados das tabelas por data.
novoLancamento.ordenarPeloMes();

export const apagarDado = {
   elementoClicado: {},
   selecionarDadosClicados: function (event) {
      console.log('aqui')
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
      carregaTabelas.somaTotalDaTabela(ano, mes, this.elementoClicado.tabelaBD);

      carregaGraficos.atualizaDadosDosGrafico();
   }
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
   try {
      const classes = ['deleteBox', 'slide', 'delete-box-confirm', 'deleteBox-buttons'];

      if (event.target.classList.contains('slide')) return;

      for (const classe of classes) {
         if (event.target.parentElement.classList.contains(classe)) {
            return;
         };
      };

      if (!deleteBox.classList.contains('hidden')) {
         deleteBox.classList.add('hidden');
         deleteBoxSlide.style.marginLeft = '0px';
      };
   } catch (error) {
   }
});


carregaTabelas.insereDados('despesas');
carregaTabelas.insereDados('receitas');
carregaTabelas.insereDados('fixos');
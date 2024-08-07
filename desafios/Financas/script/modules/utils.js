import { baseDeDados } from "./dados.js";
import { apagarDado } from "../main.js";

const tabelaDespesas = document.querySelector('.despesas-tabela');
const tabelaReceitas = document.querySelector('.receitas-tabela');
const tabelaFixos = document.querySelector('.fixos-tabela');


let ano = 2024;
let mes = 'JAN';
export { ano, mes };

export function mudaMesEAno(mesSelecionado, anoSelecionado) {
   mes = mesSelecionado;
   ano = anoSelecionado;
}

export function criar(tipo) {
   return document.createElement(`${tipo}`);
}

export const carregaTabelas = {
   insereDados: function (tabelaBD) {
      // try{
      let tabelaDOM = this.selecionaTabelaNoDOM(tabelaBD);
      this.formataTabelaDOM(tabelaBD, tabelaDOM);

      //Cria os elementos <tr> e <td> nas tabelas do DOM
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
      // }catch(error){
      //    console.log(error);
      // }

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

export const meses = {
   JAN: 'Janeiro', FEV: 'Fevereiro', MAR: 'Março', ABR: 'Abril',
   MAI: 'Maio', JUN: 'Junho', JUL: 'Julho', AGO: 'Agosto',
   SET: 'Setembro', OUT: 'Outubro', NOV: 'Novembro', DEZ: 'Dezemto'
}
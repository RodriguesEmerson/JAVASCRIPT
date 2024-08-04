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

export const carregaLinksNav = {
   anosEncontrados: [],
   mesesEncontrados: [],
   carregaLinksNavNoDOM: function (ANO, MES) {
      navLinks.innerHTML = '';
      this.buscaAnosNaBD();
      this.anosEncontrados.forEach(ANO => {
         //Cria <ul> com os anos encontrados;
         this.buscaMesesNaBD(ANO);
         const ulAno = criar('ul');
         ulAno.setAttribute('class', 'nav-link-ano');
         ulAno.setAttribute('id', `A${ANO}`);
         ulAno.innerHTML =
            `<li class="link-ano">
                     <input type="checkbox" name="ano" id="ano${ANO}">
                         <label for="ano${ANO}">
                             <span class="sinal-abir-fechar">+</span> 
                             ${ANO}
                             <span></span>
                         </label>
                     </li>`;

         //Cria <ol> com os meses encontrados;
         const olMes = criar('ol');
         olMes.setAttribute('class', 'nav-link-mes');
         ulAno.appendChild(olMes)
         this.mesesEncontrados.forEach(MES => {
            const liMes = criar('li')
            liMes.setAttribute('value', `${MES}`);
            liMes.setAttribute('class', 'link-mes');
            liMes.textContent = `${this.mesSemAbrev(MES, false)}` //(mes, abriviado)
            olMes.appendChild(liMes)
         });

         navLinks.appendChild(ulAno);
      });
      this.addEventsNosLinks();
   },

   buscaAnosNaBD: function () {
      this.anosEncontrados = [];
      for (const ano in baseDeDados) {
         this.anosEncontrados.push(`${ano}`);
      }
   },
   buscaMesesNaBD: function (ANO) {
      this.mesesEncontrados = [];
      for (const mes in baseDeDados[ANO]) {
         this.mesesEncontrados.push(`${mes}`);
      }
   },

   addEventsNosLinks: function () {
      const checboxAno = document.querySelectorAll('input[type=checkbox]');
      const liMeses = document.querySelectorAll('.link-mes');

      for (let ind = 0; ind < checboxAno.length; ind++) {
         checboxAno[ind].addEventListener('change', abrirFecharLinkAno);
      }
      for (let ind = 0; ind < liMeses.length; ind++) {
         liMeses[ind].addEventListener('click', mudarMesTabelas.selecionaAnoMesClicado.bind(mudarMesTabelas, liMeses[ind]))
      }
   },

   mesSemAbrev: function (mes, abreviado) {
      //Retorna o mes sem abreviatura;
      if (!abreviado) {
         for (const key in meses) {
            if (`${key}` == mes) {
               return meses[key];
            }
         }
      } else {
         for (const key in meses) {
            if (`${meses[key]}` == mes) {
               return `${key}`;
            }
         }
      }
   },
}
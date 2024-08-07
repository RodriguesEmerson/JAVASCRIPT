import { carregaTabelas, criar, mudaMesEAno, meses } from "./modules/utils.js";
import { baseDeDados } from "./modules/dados.js";
import { carregaGraficos } from "./graficos.js";

const menuButton = document.querySelector('.menu-button');
const navBar = document.querySelector('.nav-bar');
const navigation = document.querySelector('.navigation');
const navLinks = document.querySelector('.nav-links');

let anoAnteriorSelecionado;
// import { carregaGraficos } from "./graficos.js";


//Abre e fecha a barra de navegação (menu)!
menuButton.addEventListener('click', () => {
   navBar.classList.toggle('show-nav-bar');
   navBar.classList.toggle('shadow')
   navigation.classList.toggle('hidden');
   if(navBar.classList.contains('show-nav-bar')){
      menuButton.innerHTML = '<span class="material-symbols-outlined">close</span>'
   }else{
      menuButton.innerHTML = '<span class="material-symbols-outlined">menu</span>';
   }
})

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

 export const mudarMesTabelas = {
   mesAnteriorSelecionado: '',
   mesAtualSelecionado: '',
   anoClicadoID: '',
   mesClicadoValue: '',
   selecionaAnoMesClicado: function (li) {
      this.mesAtualSelecionado = li;
      this.mesClicadoValue = li.getAttribute('value');
      this.anoClicadoID = li.closest('ul')
         .getAttribute('id')
         .substring(1);
      this.mudaCores();
   },

   mudarParaMesSelecionado: function () {
      const tabelas = ['despesas', 'receitas', 'fixos']
      // ano = this.anoClicadoID;
      // mes = this.mesClicadoValue;
      mudaMesEAno(this.mesClicadoValue, this.anoClicadoID);
      tabelas.forEach(element => {
         carregaTabelas.insereDados(element); //../script
      });
      carregaGraficos.atualizaDadosDosGrafico()
   },
   
   //mudar a cor do mês e do ano através do mês clicado
   //para indicar o mês selecionado.
   mudaCores: function () {
      const anoAtualSelecionado = document.querySelector(`#A${this.anoClicadoID} .link-ano`);
      this.mesAtualSelecionado.style.color = 'white';
      if (this.mesAnteriorSelecionado) {
         if (this.mesAnteriorSelecionado == this.mesAtualSelecionado) return
         this.mesAnteriorSelecionado.style.color = 'gray';
      }
      anoAnteriorSelecionado.style.color = 'gray';
      anoAtualSelecionado.style.color = 'white';

      this.mesAnteriorSelecionado = this.mesAtualSelecionado;
      anoAnteriorSelecionado = anoAtualSelecionado;
      this.mudarParaMesSelecionado();
   },
}

export function abrirFecharLinkAno() {
   const ulPai = this.closest('ul');
   const ulPaiID = this.closest('ul').getAttribute('id');
   const sinalAbrirFechar = document.querySelector(`#${ulPaiID} .sinal-abir-fechar`);

   if (this.checked) {
      sinalAbrirFechar.textContent = '-';
      ulPai.style.height = 'auto';
   } else {
      sinalAbrirFechar.textContent = '+';
      ulPai.style.height = '20px';
   }

   //Mudar cor do ano clicado;
   const anoAtualSelecionado = document.querySelector(`#${ulPaiID} .link-ano`);
   if (sinalAbrirFechar.textContent == '-') {
      anoAtualSelecionado.style.color = 'white';
   }
   if (anoAnteriorSelecionado) {
      anoAnteriorSelecionado.style.color = 'gray';
      if (anoAnteriorSelecionado == anoAtualSelecionado) {
         anoAnteriorSelecionado.style.color = 'white';
         if (sinalAbrirFechar.textContent == '+') {
            anoAnteriorSelecionado.style.color = 'gray';
         }
      }
   }
   anoAnteriorSelecionado = anoAtualSelecionado;
};

carregaLinksNav.carregaLinksNavNoDOM();


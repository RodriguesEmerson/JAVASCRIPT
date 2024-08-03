import { ano, mes } from "./navigation.js";
import { baseDeDados } from "./modules/dados.js";

const graficos = document.querySelector('.graficos');
const graficoDespesas = document.querySelector('.grafico-despesas');
const graficoReceitas = document.querySelector('.grafico-receitas');
const graficoResumo = document.querySelector('.grafico-resumo');
const legend = document.querySelector('#legend');
let coresReceitas = ['#10454F', '#C72673', '#2BB22E', '#F2B035', '#543486', '#F24C27', '#086AA8'];
const tabelas = ['despesas', 'receitas', 'fixos'];
let llabel = ['Alimentação', 'Saúde', 'Casa', 'Pessoal'];

let arrLabels, arrData = [];
let totalDespesas, totalReceitas;

const carregaGraficos = {
   labels: [],
   data: {},
   buscarDados: function (tabela) {
      this.labels = [];
      this.data = {}
      arrData = [];
      arrLabels = [];
      console.log(`'**********${tabela}***********'`)
      baseDeDados[ano][mes][tabela].forEach(element => {
         let atributo = 'desc';
         if (tabela == 'despesas') atributo = 'categoria';

         //Pega as categoria ou descrição dos elemento.
         if (this.labels.indexOf(element[atributo]) == -1) {
            this.labels.push(element[atributo]);
         }
         
         //Soma os valores de acordo cada categoria ou descrição.
         if (!this.data[element[atributo]]) {
            this.data[element[atributo]] = 0;
         }
         this.data[element[atributo]] += Number(element.valor);
      });
      this.organizaOsDados()
      console.log(this.labels);
      console.log(arrLabels)
      // console.log(tabelas[0].charAt(0).toUpperCase() + tabelas[0].substring(1));
   },

   organizaOsDados: function () {
      const data = this.data;
      for (const categoria in data) {
         arrData.push(data[categoria])
      }
      arrLabels = this.labels
      this.somaValoresDaTabela()
   },

   somaValoresDaTabela: function() {
      if(!totalDespesas){
         arrData.reduce((acc, curr) =>{
            return totalDespesas = acc + curr;
         })
         console.log('Despesas: ' + totalDespesas)
      }else{
         arrData.reduce((acc, curr) => {
            return totalReceitas = acc + curr
         })
         console.log('Receitas: ' + totalReceitas)
      }
   }
}

let ctxGraficoDespesas = new Chart(graficoDespesas, {
   Dados: carregaGraficos.buscarDados('despesas'),
   type: 'bar',
   data: {
      labels: arrLabels,
      datasets: [{
         label: 'Despesa',
         data: arrData,
         borderWidth: 1,
      }]
   },
   options: {
      maintainAspectRatio: false, //Permite redimencionar o gráfico com css
      plugins: {
         title: {
            display: true,
            fontSize: 15,
            text: 'Despesas'
         },
         legend: {
            display: false,
         },
      },
      scales: {
         y: {
            beginAtZero: true
         }
      },
      backgroundColor: [
         '#A02020',
      ],
   }
});
let ctxGraficoReceitas = new Chart(graficoReceitas, {
   Dados: carregaGraficos.buscarDados('receitas'),
   type: 'doughnut',
   data: {
      labels: arrLabels,
      datasets: [{
         label: 'Receita',
         data: arrData,
         borderWidth: 0.5,
      },
      ]
   },
   options: {
      maintainAspectRatio: false,
      plugins: {
         title: {
            display: true,
            fontSize: 15,
            text: 'Receitas'
         }, 
      },
      scales: {
         y: {
            beginAtZero: true
         }
      },
      backgroundColor: coresReceitas,
   }
})

let ctxGraficoResumo = new Chart(graficoResumo, {
   type: 'line',
   data: {
      labels: ['Despesas', 'Receitas'],
      datasets: [{
         label: 'Despesas',
         data: [0, -totalDespesas],
         borderColor: '#A02020',
         fill: false,
         cubicInterpolationMode: 'monotone',
         tension: 0.4,
         backgroundColor: '#A02020',

      },
      {
         label: '0',
         data: [0, 0],
         borderColor: 'gray',
         fill: false,
         cubicInterpolationMode: 'monotone',
         tension: 0.4,
         backgroundColor: 'gray',
      },
      {
         label: 'Receitas',
         data: [0, totalReceitas],
         borderColor: 'green',
         fill: false,
         cubicInterpolationMode: 'monotone',
         tension: 0.4,
         backgroundColor: 'green'
      }
      ]
   },
   options: {
      maintainAspectRatio: true,
      plugins: {
         title: {
            display: true,
            fontSize: 25,
            text: 'Resumo'
         },
         legend: {
            display: true,
         }
      },
      scales: {
         x:{
            display: false,
            color: 'white'
         },
         y: {
            // beginAtZero: true
            suggestedMin: -10,
            suggestedMax: totalReceitas + 50,
         },
      },
      color: 'white',
      // backgroundColor: ['red', 'gray', 'green'],
   }
})

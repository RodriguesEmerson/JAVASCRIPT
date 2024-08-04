import { ano, mes } from "./modules/utils.js";
import { baseDeDados } from "./modules/dados.js";

const graficos = document.querySelector('.graficos');
const graficoDespesas = document.querySelector('.grafico-despesas');
const graficoReceitas = document.querySelector('.grafico-receitas');
const graficoResumo = document.querySelector('.grafico-resumo');
const legend = document.querySelector('#legend');
let coresReceitas = ['#10454F', '#C72673', '#2BB22E', '#F2B035', '#543486', '#F24C27', '#086AA8'];
const arrGraficos = ['despesas', 'receitas'];
let llabel = ['Alimentação', 'Saúde', 'Casa', 'Pessoal'];

let arrLabels, arrData, arrLabelsDatasResumo = [];
let totalDespesas, totalReceitas;
let despesasSomadas = false;

export const carregaGraficos = {
   labels: [],
   data: {},

   atualizaDadosDosGrafico: function(){
      arrGraficos.forEach(grafico => {
         this.buscarDados(grafico);
         this.organizaOsDados(); 
         this.somaValoresDaTabela();
         despesasSomadas = true;
         this.renderizaGraficosNoDOM(grafico);
      });
      despesasSomadas = false;
   },

   buscarDados: function (tabela) {
      this.labels = [];
      this.data = {};
      arrData = [];
      arrLabels = [];

      //Pega os dados em baseDeDados -- dados.js.
      baseDeDados[ano][mes][tabela].forEach(element => {
         let atributo = 'desc';
         if (tabela == 'despesas') atributo = 'categoria';
         let categoria = element[atributo];

         //Pega as keys categoria ou descrição dos elementos e lança em arrLabels.
         if (this.labels.indexOf(categoria) == -1) { //verifica se já existe no array.
            this.labels.push(categoria);
         }
         this.somaValoresCategorias(categoria, element);
      });
   },

   somaValoresCategorias: function(categoria, element){
      //Se não tiver, cria uma categoria em this.data e soma seu valor.
      if (!this.data[categoria]) {
         this.data[categoria] = 0;
      }
      this.data[categoria] += Number(element.valor);
   },

   organizaOsDados: function () {
      //Pega o valor somado de cada categoria e lança no arrData.
      const data = this.data;
      for (const categoria in data) {
         arrData.push(data[categoria])
      }
      arrLabels = this.labels
   },

   somaValoresDaTabela: function() {
      if(!despesasSomadas){
         arrData.reduce((acc, curr) =>{
            return totalDespesas = acc + curr;
         })
      }else{
         arrData.reduce((acc, curr) => {
            return totalReceitas = acc + curr;
         })
      }
   },

   renderizaGraficosNoDOM: function(grafico){
      if(grafico == 'despesas'){
         ctxGraficoDespesas.data.labels = arrLabels;
         ctxGraficoDespesas.data.datasets[0].data = arrData;
         ctxGraficoDespesas.update();
      } 
      
      if(grafico == 'receitas'){
         ctxGraficoReceitas.data.labels = arrLabels;
         ctxGraficoReceitas.data.datasets[0].data = arrData;
         ctxGraficoReceitas.update();
      }
      //Grafico Resumo 
      ctxGraficoResumo.data.datasets[0].data = [0, totalDespesas];
      ctxGraficoResumo.data.datasets[1].data = [0, totalReceitas]
      ctxGraficoResumo.update();
   },
}

let ctxGraficoDespesas = new Chart(graficoDespesas, {
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
      labels:['Resumo', 'Resumo'],//pontos do gráfico.
      datasets: [{
         label: 'Despesas', //legendas acima do gráfico.
         data: [],
         borderColor: '#A02020', //red
         fill: false,
         cubicInterpolationMode: 'monotone',
         tension: 0.4,
         backgroundColor: '#A02020', //red
      },
      {
         label: 'Receitas',
         data: [],
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
         },
         y: {
            beginAtZero: true,
            // suggestedMin: -10,
            // suggestedMax: totalReceitas + 50,
         },
      },
      // color: 'white',
      // backgroundColor: ['red', 'gray', 'green'],
   }
})

carregaGraficos.atualizaDadosDosGrafico();


import {ano, mes} from "./navigation.js";
import { baseDeDados } from "./modules/dados.js";

const graficoDespesas = document.querySelector('.grafico-despesas');
const graficoReceitas = document.querySelector('.grafico-receitas');
const graficoResumo = document.querySelector('.grafico-resumo');
const legend = document.querySelector('#legend');
let cor1 = 'rgb(200, 0, 0)';
const tabelas = ['despesas', 'receitas', 'fixos'];
let llabel = ['Alimentação', 'Saúde', 'Casa', 'Pessoal'];

let arrLabels, arrData = [];

const carregaGraficos = {
    labels: [],
    data: {},
    buscarDados: function(tabela){
            this.labels = [];
            this.data = {}
            arrData = [];
            arrLabels = [];
            console.log(`'**********${tabela}***********'`)
            baseDeDados[ano][mes][tabela].forEach(element => {
                let atributo = 'desc';
                if(tabela == 'despesas') atributo = 'categoria';
                
                //Pega as categoria ou descrição dos elemento.
                if(this.labels.indexOf(element[atributo]) == -1){
                    this.labels.push(element[atributo]);                 
                }

                //Soma os valores de acordo cada categoria ou descrição.
                if(!this.data[element[atributo]]){
                    this.data[element[atributo]] = 0;
                }
                this.data[element[atributo]] += Number(element.valor); 
            });
            this.organizaOsDados()
            console.log(this.labels);
            console.log(arrLabels)
            // console.log(tabelas[0].charAt(0).toUpperCase() + tabelas[0].substring(1));
    },

    organizaOsDados: function(){
        const data = this.data;
        for(const categoria in data){
            arrData.push(data[categoria])
        }

        arrLabels = this.labels
    }
}

let ctxGraficoDespesas = new Chart(graficoDespesas,  {
    Dados:carregaGraficos.buscarDados('despesas'),
    type: 'bar',
    data: {
        // labels: ['JAN', 'FEV', 'MAR']
        labels: arrLabels,
        datasets: [{
            label: 'Gasto',
            data: arrData,
            borderWidth: 1,
        }]
    },
    options: {
        maintainAspectRatio: false, //Permite redimencionar o gráfico
        plugins: {
            title: {
                display: true,
                fontSize: 15,
                text: 'Gráfico Despesas'
            },
            legend: {
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        backgroundColor: [
            cor1,
        ],
    }
});
let ctxGraficoReceitas = new Chart(graficoReceitas, {
    Dados:carregaGraficos.buscarDados('receitas'),
    type: 'doughnut',
    data: {
        // labels: ['JAN', 'FEV', 'MAR']
        labels: arrLabels,
        datasets: [{
            label: 'Receita',
            data: arrData,
            borderWidth: 1,
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                fontSize: 15,
                text: 'Gráfico Despesas'
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        backgroundColor: [
            cor1,
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
    }
})

let ctxGraficoResumo = new Chart(graficoResumo, {
    Dados:carregaGraficos.buscarDados('fixos'),
    type: 'line',
    data: {
        // labels: ['JAN', 'FEV', 'MAR']
        labels: arrLabels,
        datasets: [{
            label: 'Gasto Fixo',
            data: arrData,
            borderWidth: 1,
        }]
    },
    options: {
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                fontSize: 15,
                text: 'Gráfico Despesas'
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        },
        backgroundColor: [
            cor1,
            'rgb(255, 205, 86)'
        ],
    }
})

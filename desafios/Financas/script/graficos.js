import {ano, mes} from "./navigation.js";
import { baseDeDados } from "./modules/dados.js";

const graficoDespesas = document.querySelector('.grafico-despesas');
const graficoReceitas = document.querySelector('.grafico-receitas');
const graficoResumo = document.querySelector('.grafico-resumo');
const legend = document.querySelector('#legend');
let cor1 = 'rgb(200, 0, 0)';
const tabelas = ['despesas', 'receitas', 'fixos'];
let llabel = ['Alimentação', 'Saúde', 'Casa', 'Pessoal'];


const carregaGraficos = {
    labels: [],
    data: {
        despesas: {},
        receitas: {},
        fixos: {},
    },
    buscarDados: function(){
        tabelas.forEach(tabela =>{
            this.labels = [];
            this.data = {
                despesas: {},
                receitas: {},
                fixos: {},
            }
            
            baseDeDados[ano][mes][tabela].forEach(element => {
                //Pega as categoria ou descrição dos elemento.
                let atributo = 'desc';
                if(tabela == 'despesas') atributo = 'categoria';
                if(this.labels.indexOf(element[atributo]) == -1){
                    this.labels.push(element[atributo]);                 
                }

                //Soma os valores de acordo cada categoria ou descrição.
                if(!this.data[tabela][element[atributo]]){
                    this.data[tabela][element[atributo]] = 0;
                }
                this.data[tabela][element[atributo]] += Number(element.valor); 
            });
            console.log(this.labels);
            console.log(this.data)
            console.log(tabelas[0].charAt(0).toUpperCase() + tabelas[0].substring(1))
        });
       
    },

    
}
carregaGraficos.buscarDados()
let ctxGraficoDespesas = new Chart(graficoDespesas, {
    type: 'bar',
    data: {
        // labels: ['JAN', 'FEV', 'MAR']
        labels: llabel,
        datasets: [{
            label: 'Gasto',
            data: ['134', '492', '432', '134'],
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
    type: 'doughnut',
    data: {
        // labels: ['JAN', 'FEV', 'MAR']
        labels: llabel,
        datasets: [{
            label: 'Receita',
            data: ['134', '492', '432'],
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
    type: 'doughnut',
    data: {
        // labels: ['JAN', 'FEV', 'MAR']
        labels: llabel,
        datasets: [{
            label: 'Gasto Fixo',
            data: ['134', '492', '432'],
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
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
    }
})

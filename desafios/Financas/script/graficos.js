const graficoDespesas = document.querySelector('.grafico-despesas');
const graficoReceitas = document.querySelector('.grafico-receitas');
const graficoResumo = document.querySelector('.grafico-resumo');
const legend = document.querySelector('#legend')
let cor1 = 'rgb(200, 0, 0)';
let llabel = ['Alimentação', 'Saúde', 'Casa', 'Pessoal']

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
            legend:{
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
            label: 'Gasto',
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
            label: 'Gasto',
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

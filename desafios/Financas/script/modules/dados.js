export let categorias = [
   ['Alimentação', 'Pessoal', 'Casa', 'Saúde'],
   ['Receitas'],
]

export let baseDeDados = {
   2024: {
      JAN: {
         despesas: [
            { desc: 'Desp1', data: '06/01/2024', categoria:'Ctgr', valor: '151', id: '2' },
            { desc: 'Desp2', data: '05/01/2024', categoria:'Ctgr', valor: '2', id: '3' },
            { desc: 'Desp3', data: '03/01/2024', categoria:'Ctgr', valor: '3', id: '4' },
         ],
         receitas: [
            { desc: 'Rece1', data: 'Data', valor: '4', id: '2' },
            { desc: 'Rece2', data: 'Data', valor: '5', id: '3' },
            { desc: 'Rece3', data: 'Data', valor: '6', id: '4' },
         ],
         fixos: [
            { desc: 'Fixo1', data: 'Data', valor: '7', id: '2' },
            { desc: 'Fixo2', data: 'Data', valor: '8', id: '3' },
            { desc: 'Fixo3', data: 'Data', valor: '09', id: '4' },
         ]
      },
      FEV: {
         despesas: [
            { desc: 'Desp1', data: 'FEV', categoria:'Ctgr', valor: '100', id: '2' },
            { desc: 'Desp2', data: 'FEV', categoria:'Ctgr', valor: '28', id: '3' },
            { desc: 'Desp3', data: 'FEV', categoria:'Ctgr', valor: '34', id: '4' },
         ],
         receitas: [
            { desc: 'Rece1', data: 'FEV', valor: '46', id: '2' },
            { desc: 'Rece2', data: 'FEV', valor: '77', id: '3' },
            { desc: 'Rece3', data: 'FEV', valor: '68', id: '4' },
         ],
         fixos: [
            { desc: 'Fixo1', data: 'FEV', valor: '71', id: '2' },
            { desc: 'Fixo2', data: 'FEV', valor: '82', id: '3' },
            { desc: 'Fixo3', data: 'FEV', valor: '23', id: '4' },
         ]
      }
   },
}


// function carregaDespesas() {
//     carregaTabelas(tabelaDespesas, 4, dadosDespesas)
// }
// function carregaReceitas() {
//     carregaTabelas(tabelaReceitas, 3, dadosReceitas)
// }
// function carregaFixos() {
//     carregaTabelas(tabelaFixos, 3, dadosFixos)
// }

// function carregaTabelas(tabela, colunas, dados) {
//     tabela.innerText = '';
//     let titulos = 0;
//     dados.forEach(element => {
//         const tr = criar('tr')
//         element.forEach(element => {
//             let td = criar('td');
//             if (titulos < colunas) td = criar('th');
//             td.innerText = element;
//             tr.appendChild(td)
//             titulos++;
//         })
//         tabela.appendChild(tr)
//     });
// }
// tabelaDespesas.addEventListener('contextmenu', (event) => {
//     event.preventDefault();
//     apagarDado(event, 'despesas')
// })
// tabelaReceitas.addEventListener('contextmenu', (event) => {
//     event.preventDefault();
//     apagarDado(event, 'receitas')
// })
// tabelaFixos.addEventListener('contextmenu', (event) => {
//     event.preventDefault();
//     apagarDado(event, 'fixos');
// })
// function apagarDado(event, tabela) {
//     deleteBox.classList.remove('hidden');

//     let left = event.clientX;
//     let top = event.clientY;
//     deleteBox.style.left = `${left + 3}px`;
//     deleteBox.style.top = `${top - 45}px`;

//     let tr = event.target.closest('tr');
//     let trID = event.target.closest('tr').getAttribute('id');
//     let tabelaPai = tr.closest('table');
//     let objNaBaseDeDados;
//     todosOsDados[tabela][ano][mes].forEach(element => {
//         if (element.id == trID) objNaBaseDeDados = element;
//     });

// }
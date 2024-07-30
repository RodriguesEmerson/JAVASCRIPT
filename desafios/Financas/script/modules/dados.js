export let categorias = [
   ['*Selecionar*','Alimentação', 'Pessoal', 'Casa', 'Saúde'],
   ['*Selecionar*', 'Receitas', 'Outros1', 'Outros2'],
]

export let baseDeDados = {
   // 2024: {
   //    JAN: {
   //       despesas: [
   //          { desc: 'Desp1', data: '21/01/2024', categoria:'Ctgr', valor: '151', id: '22' },
   //          { desc: 'Desp2', data: '15/01/2024', categoria:'Ctgr', valor: '2', id: '32' },
   //          { desc: 'Desp3', data: '14/01/2024', categoria:'Ctgr', valor: '3', id: '42' },
   //       ],
   //       receitas: [
   //          { desc: 'Rece1', data: '14/01/2024', valor: '4', id: '21' },
   //          { desc: 'Rece2', data: '05/01/2024', valor: '5', id: '32' },
   //          { desc: 'Rece3', data: '03/01/2024', valor: '6', id: '43' },
   //       ],
   //       fixos: [
   //          { desc: 'Fixo1', data: '12/01/2024', valor: '7', id: '25' },
   //          { desc: 'Fixo2', data: '13/01/2024', valor: '8', id: '36' },
   //          { desc: 'Fixo3', data: '02/01/2024', valor: '09', id: '47' },
   //       ]
   //    },
   //    FEV: {
   //       despesas: [
   //          { desc: 'Desp1', data: '06/02/2024', categoria:'Ctgr', valor: '151', id: '28' },
   //          { desc: 'Desp2', data: '05/02/2024', categoria:'Ctgr', valor: '2', id: '39' },
   //          { desc: 'Desp3', data: '03/02/2024', categoria:'Ctgr', valor: '3', id: '49' },
   //       ],
   //       receitas: [
   //          { desc: 'Rece1', data: '06/02/2024', valor: '4', id: '12' },
   //          { desc: 'Rece2', data: '05/02/2024', valor: '5', id: '13' },
   //          { desc: 'Rece3', data: '03/02/2024', valor: '6', id: '14' },
   //       ],
   //       fixos: [
   //          { desc: 'Fixo1', data: '09/02/2024', valor: '7', id: '62' },
   //          { desc: 'Fixo2', data: '06/02/2024', valor: '8', id: '73' },
   //          { desc: 'Fixo3', data: '02/02/2024', valor: '09', id: '84' },
   //       ]
   //    }
   // },
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

//*************************Só funciona com data menores que dia 13**************************/
// const ordernarPorData = {
//     buscarDados: function () {
//         for (const ano in baseDeDados) {
//             for (const mes in baseDeDados[ano]) {
//                 for(const chave in baseDeDados[ano][mes]){
//                     baseDeDados[ano][mes][chave].sort((a, b) => {
//                         const dataA = new Date(a.data).getTime();
//                         const dataB = new Date(b.data).getTime();
//                         return dataA - dataB;
//                     });
//                 }
//             }
//         }
//     }    
// }
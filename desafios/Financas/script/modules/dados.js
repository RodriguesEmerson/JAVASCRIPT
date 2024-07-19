export let categorias = [
   ['Alimentação', 'Pessoal', 'Casa', 'Saúde']
]
export let todosOsDados = {
   despesas: {
      2024: {
         JAN: [
            { desc: 'Desp1', data: 'Data', categoria:'Ctgr', valor: '1', id: '2' },
            { desc: 'Desp2', data: 'Data', categoria:'Ctgr', valor: '2', id: '3' },
            { desc: 'Desp3', data: 'Data', categoria:'Ctgr', valor: '3', id: '4' },
         ],
         FEV: [
            
         ]
      }
   },
   receitas: {
      2024: {
         JAN: [
            { desc: 'Rece1', data: 'Data', valor: '4', id: '2' },
            { desc: 'Rece2', data: 'Data', valor: '5', id: '3' },
            { desc: 'Rece3', data: 'Data', valor: '6', id: '4' },
         ],
         FEV: {

         }
      }
   },
   fixos: {
      2024: {
         JAN: [
            { desc: 'Fixo1', data: 'Data', valor: '7', id: '2' },
            { desc: 'Fixo2', data: 'Data', valor: '8', id: '3' },
            { desc: 'Fixo3', data: 'Data', valor: '09', id: '4' },
         ],
         FEV: {

         }
      }
   }
   
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

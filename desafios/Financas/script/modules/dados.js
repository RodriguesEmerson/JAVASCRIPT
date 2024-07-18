export let dadosDespesas = [
   ['DESPESAS', 'DATA', 'CATEGORIA', 'VALOR'],
   ['Cell0', '15/04/2024', 'Pessoal', '100'],
   ['Cell1', '15/04/2024', 'Pessoal', '200'],
   ['Cell2', '15/04/2024', 'Pessoal', '300'],
   ['Cell3', '15/04/2024', 'Pessoal', '400'],
   ['Cell4', '15/04/2024', 'Pessoal', '500'],
   ['Cell5', '15/04/2024', 'Pessoal', '600'],
]
export let dadosReceitas = [
   ['RECEITAS', 'DATA', 'VALOR'],
   ['Rec1', '15/07/2024', '100'],
   ['Rec2', '15/07/2024', '200'],
   ['Rec3', '15/07/2024', '300'],
   ['Rec4', '15/07/2024', '400'],
   ['Rec5', '15/07/2024', '500'],
]
export let dadosFixos = [
   ['DRESCRIÇÃO', 'DATA', 'VALOR'],
   ['Gasto1', '15/07/2024', '100'],
   ['Gasto2', '15/07/2024', '200'],
   ['Gasto3', '15/07/2024', '300'],
]
export let categorias = [
   ['Alimentação', 'Pessoal', 'Casa', 'Saúde']
]
export let todosOsDados = {
   despesas: {
      2024: {
         JAN: [
            { desc: 'Despesas', data: 'Data',categoria:'Categoria', valor: 'Valor', id: '1' },
            { desc: 'Desp1', data: 'Data', categoria:'Ctgr', valor: '0,00', id: '2' },
            { desc: 'Desp2', data: 'Data', categoria:'Ctgr', valor: '0,00', id: '3' },
            { desc: 'Desp3', data: 'Data', categoria:'Ctgr', valor: '0,00', id: '4' },
         ],
         FEV: [
            
         ]
      }
   },
   Receitas: {
      ano: {
         2024: {
            JAN: [
               { desc: 'Receitas', data: 'Data', categoria:'Categoria', valor: 'Valor', id: '1' },
               { desc: 'Rece1', data: 'Data', categoria:'Ctgr', valor: '0,00', id: '2' },
               { desc: 'Rece2', data: 'Data', categoria:'Ctgr', valor: '0,00', id: '3' },
               { desc: 'Rece3', data: 'Data', categoria:'Ctgr', valor: '0,00', id: '4' },
            ],
            FEV: {

            }
         }
      }
   },
   Fixos: {
      ano: {
         2024: {
            JAN: [
               { desc: 'Fixos', data: 'Data' ,categoria:'Categoria', valor: 'Valor', id: '1' },
               { desc: 'Fixo1', data: 'Data', categoria:'Ctgr', valor: '0,00', id: '2' },
               { desc: 'Fixo2', data: 'Data', categoria:'Ctgr', valor: '0,00', id: '3' },
               { desc: 'Fixo3', data: 'Data', categoria:'Ctgr', valor: '0,00', id: '4' },
            ],
            FEV: {

            }
         }
      }
   }
   
}

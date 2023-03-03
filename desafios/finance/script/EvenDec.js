let dados = {
    summaryEntrys: [
        {category: 'House', description:'Internt', 
        amount:'65.30',date: '23/02/23', type: 'Withdraw', id: 'En321'
        },
        {category: 'House', description:'Fruits', 
        amount:'23.00',date: '23/02/23', type: 'Deposit', id: 'En123'
        },
        {category: 'House', description:'Fruits',
        amount:'10.00',date: '23/02/23', type: 'Deposit', id: 'En213'
        },
    ],
    CategoryArr:['House', 'Work'],
    Bills:[
        {fonte:'store', amount: '654.23', date:'23/02/23', 
        type:'rec', installment:'single', installmentTotal:'single', id: 'Bi123'
        },
        {fonte:'mall', amount: '543.12', date:'23/02/23', 
        type:'rec', installment:'single', installmentTotal:'single', id: 'Bi321'
        },
        {fonte:'test', amount: '432.45', date:'23/03/23', 
        type:'pay', installment:'3', installmentTotal:'7', id: 'Bi213'
        },
    ],
    balance: {
        toreceive:{amount: '1233.64', pcent: '5'},
        payable:{amount: '932.65', pcent: '-9'},
        balance:{amount: '1644.75', pcent: '12'},
    }
}
let preDados = {
    lastCategoryLI: `<li>
        <input type="text" id="add-new-category-text" placeholder="Add category">
        <input type="button" id="add-new-category-btn" value="+">
        </li>`,
    firstSummaryRow: `<thead><tr>
        <th scope="col" style="width: 120px">Category</th>
        <th scope="col" style="width: 300px">Description</th>
        <th scope="col" style="width: 120px">Amount</th>
        <th scope="col" style="width: 120px">Date</th>
        </tr></thead>`,
    firstSummaryBills: `<thead><tr>
        <th scope="col" style="width: 120px">Fonte</th>
        <th scope="col" style="width: 150px">Amount</th>
        <th scope="col" style="width: 120px">Date</th>
        <th scope="col" style="width: 120px">installment</th>
        </tr></thead>`,
}

/*nav================================================================================*/
const openModalEntry = document.querySelector('.open-modal-entry')
const openModalBill = document.querySelector('.open-modal-bill')


/*add entrys=========================================================================*/
const btnCloseModal = document.querySelectorAll('.close-modal')
const modalEntry = document.querySelector('.modal-entry')

const entryType = document.getElementsByName('radio-entry')
const entryAmount = document.getElementById('entry-value')
const entryDescription = document.getElementById('entry-description')

const categoryList = document.querySelector('.category-list')
const category = document.querySelector('.select-category')
const contAddNewEntry = document.querySelector('.add-new-entry-category')
let addNewCategoryText,categoryItem

const contEntry = document.querySelector('.cont-entry')
const contBill = document.querySelector('.cont-bills')
const submitEntry = document.querySelector('#btn-send-entry')


/*add bills=========================================================================*/
const billType = document.getElementsByName('radio-bill')
const billAmount = document.getElementById('bill-value')
const billDescription = document.getElementById('bill-description')
const billInstallment = document.getElementById('bill-installment')
const submitBills = document.querySelector('#btn-send-bill')


/*dashboard=========================================================================*/
const dsToRec = document.querySelector('.dashboard-toreceive-amount')
const dsToRecTotal = document.querySelector('.dashboard-toreceive-amount-total')
const dsToRecPcent = document.querySelector('.dashboard-toreceive-amount-pcent')

const dsPayable = document.querySelector('.dashboard-payable-amount')
const dsPayableTotal = document.querySelector('.dashboard-payable-amount-total')
const dsPayablePcent = document.querySelector('.dashboard-payable-amount-pcent')

const dsBalance = document.querySelector('.dashboard-balance-amount')
const dsBalancePcent = document.querySelector('.dashboard-balance-amount-pcent')

    /*delete item box*/
    const boxDeleteItem = document.querySelector('.delete-item')
    const boxDeleteItem_title = document.querySelector('.title-box-RClick')


/*summary entrys=====================================================================*/
const summaryTable = document.querySelector('.summary-table')
let summaryTabeleItem
const graphicAmount = document.querySelector('.graphc-amount')
const checkFilterEntrys = document.querySelectorAll('.check-filter-entrys')

    /*delete item buttons*/
    const deleteEntrysButtons = document.querySelectorAll('.delete-item-btn')


/*summary bills=====================================================================*/
const summaryBills = document.querySelector('.summary-bills')
const checkFilterBills = document.querySelectorAll('.check-filter-bills')


/*logica payable:
Fazer com que o valor em Payable seja somado, de acordo os valores que estão no array Bills.
E também com que seja somado apenas as contas do mês atual e anteriores.

O valor embaixo deve ser o total pago, e o valor maior deve ser o quanto resta.
da mesma forma de ser foito no To Receive.*/
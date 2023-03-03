let tday = function(){
    let date = new Date();
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    year = year.toString().slice(2,4)
    day < 10 ? day = `0${day}` : day
    month < 10 ? month = `0${month}` : month
    return `${day}/${month}/${year}`
}
/*===================================================================================================
/                                              Events                                               /
/===================================================================================================*/
category.addEventListener('click', () => {
    categoryList.classList.toggle('hide')
});


/*push a new object in 'dados' with new entry datas*/
submitEntry.addEventListener('click', () => {
    if(entryDescription.value == '' || entryAmount.value == '')
        return  alert('Fill in all fields and try again.');

    let NewItem = {
        category: `${category.textContent}`,
        description: `${entryDescription.value}`,
        amount:`${entryAmount.value}`,
        date: tday(),
        type: entryType[0].checked ? 'Deposit' : 'Withdraw',
        id: Dashboard.radomId('Entrys')
    };
    
    entryType[0].checked ? 
    Dashboard.updateBalance('','Deposit', entryAmount.value) 
    : Dashboard.updateBalance('' ,'Withdraw', entryAmount.value);

    dados.summaryEntrys.push(NewItem);
    Dashboard.loadEntrys();
});


submitBills.addEventListener('click', () => {

    if(billAmount.value = '' || billDescription.value == '') 
        return alert('Fill in all fields and try again.')

    const newBill = {
        fonte: billDescription.value,
        amount: billAmount.value,
        date: tday(),
        type: billType[0].checked ? 'rec' : 'pay',
        installment: billInstallment.value != 'single' ?
           '1' : 'single',
        installmentTotal: billInstallment.value != 'single' ?
            billInstallment.value : 'single',         
        id: Dashboard.radomId('Bills')
    }
    dados.Bills.push(newBill);
    Dashboard.loadBills();

});


/*Filter Entrys*/
for(let i = 0; i < 2; i ++){
    checkFilterEntrys[i].addEventListener('click', (e) => {
    e.target.id == 'checkDep' ?
        Dashboard.filterEntrys('D', false, true, e)
      : Dashboard.filterEntrys('W', true, false, e);
    })
};
/*Filter Bills*/
for(let i = 0; i < 2; i++){
    checkFilterBills[i].addEventListener('click', (e) => {
        e.target.id == 'checkRec' ?
        Dashboard.filterBills('r', false, true, e)
        : Dashboard.filterBills('p', true, false, e);
    })
};


/*Close Modal*/
for(let i = 0; i < 2; i++){
    btnCloseModal[i].addEventListener('click', () =>{
        modalEntry.classList.add('hide')
        contEntry.classList.add('hide')
        contBill.classList.add('hide')
    })
}
/*Open Modal*/
openModalEntry.addEventListener('click', () => {
    modalEntry.classList.remove('hide')
    contEntry.classList.remove('hide')
})
openModalBill.addEventListener('click', () => {
    modalEntry.classList.remove('hide')
    contBill.classList.remove('hide')
})


/*add options in select installment*/
for(let i = 2; i < 25; i++){
    let option = document.createElement('option')
    option.textContent = i
    billInstallment.appendChild(option)
}


/*====================================DASHBOARD===================================*/
function boxRightClickPosition(){
    let [x, y] = [event.clientX, event.clientY];
    boxDeleteItem.style.left = `${x}px`;
    boxDeleteItem.style.top = `${y - 180}px`;
}
for(let i = 0; i< 2; i++){
    deleteEntrysButtons[i].addEventListener('click', (element) =>{
        if (element.target.innerHTML == 'No') 
        return boxDeleteItem.style.display = 'none';
        Dashboard.tableRightClick(eventClick, index, table);

    })   
}

/*Dashboard Entrys===========================================*/
summaryTable.addEventListener('contextmenu', (event) =>{
    event.preventDefault();
});
summaryTable.addEventListener('mousedown', (event) =>{
    if(event.button == 0 || event.button == 1) return;
    boxDeleteItem_title.textContent = 'Do you really want to delete this entry?'
    boxRightClickPosition();
    boxDeleteItem.style.display = 'flex';
    eventClick = event;
    table = 'entrys'
    index = 2;
});

/*Dashboard Bills============================================*/
summaryBills.addEventListener('contextmenu', (event) =>{
    event.preventDefault();
});
summaryBills.addEventListener('mousedown', (event) =>{
    event.target.closest('tr').classList.value == 'rec' ?
        boxDeleteItem_title.textContent = 'Do you want to confirm receipt?'
        :boxDeleteItem_title.textContent = 'Do you really want to pay this bill?';

    if(event.button == 0 || event.button == 1) return;
    boxRightClickPosition();
    boxDeleteItem.style.display = 'flex';
    eventClick = event;
    table = 'bills';
    index = 1;
});


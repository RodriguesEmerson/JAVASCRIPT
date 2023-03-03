/*=====================================================================
/               Loads all datas that are in 'dados'                   /
/====================================================================*/
;let entryDatas = {
    /*===loads category===*/
    loadCategory: function(){
        categoryList.innerHTML = '';
        dados.CategoryArr.map (function(element) {
            categoryList.innerHTML += `<li class="category-list-item">${element}</li>`
        });

        categoryList.innerHTML += preDados.lastCategoryLI;
        this.selectCategory();
    },
    /*===update category list===*/
    selectCategory: function(){
        categoryItem = document.querySelectorAll('.category-list-item');
        for(let i = 0; i < categoryItem.length; i++){
            categoryItem[i].addEventListener('click', () => {
                category.textContent = categoryItem[i].textContent;
                categoryList.classList.add('hide');
            })
        };

        /*==add eventListener in new category text and button ==*/
        addNewCategoryText = document.querySelector('#add-new-category-text');
        document.querySelector('#add-new-category-btn').addEventListener('click', () => {
            this.addNewCategory(); 
        })
    },
    addNewCategory: function(){
        dados.CategoryArr.push(addNewCategoryText.value);
        this.loadCategory();
    },
};

/*=====================================================================
/                     Add datas in 'Dashboard'                        /
/====================================================================*/

let Dashboard = {
    /*===loads table===*/
   loadEntrys: function(t){
       let id;
        summaryTable.innerHTML= preDados.firstSummaryRow;
        dados.summaryEntrys.forEach(el => {
            
            if(t === 'D') if(el.type == 'Deposit') return    
            if(t === 'W') if(el.type == 'Withdraw') return    
            
           const newTr = document.createElement('tr');
            newTr.innerHTML = `<td>${el.category}</td>
                                    <td>${el.description}</td>
                                    <td>${el.amount}</td>
                                    <td>${el.date}</td>`;
                                    
            if(el.type == 'Deposit'){
                newTr.style.color = 'green';
                newTr.classList.add('Deposit')
            }else{
                newTr.style.color = 'red';
                newTr.classList.add('Withdraw')
            }
            
            el.id.startsWith('B') ? id = `En${el.id.slice(2,5)}`
            : id = el.id
   
            newTr.setAttribute('id', id)
            summaryTable.appendChild(newTr);

        });
    },
    loadBills: function(type){
        summaryBills.innerHTML = preDados.firstSummaryBills;
        dados.Bills.forEach(function(el){
            if(type == 'r') if(el.type == 'rec') return
            if(type == 'p') if(el.type == 'pay') return

            const newTr = document.createElement('tr');

            const invoice = el.installment == 'single' ? 'single' 
            : `${el.installment}/${el.installmentTotal}`

            newTr.innerHTML = `<td>${el.fonte}</td>
                                    <td>${el.amount}</td>
                                    <td>${el.date}</td>
                                    <td>${invoice}</td>`
            if(el.type == 'rec'){
                newTr.style.color = 'green';
                newTr.classList.add('rec');
            }else{
                newTr.style.color = 'red';
               newTr.classList.add('pay');
            }
            newTr.setAttribute('id', el.id)
            summaryBills.appendChild(newTr);
        });
    },

    loadBalance: function(){
        dsToRec.innerHTML = `$ ${Number(dados.balance.toreceive.amount).toFixed(2)}`;
        dsPayable.innerHTML = `$ ${Number(dados.balance.payable.amount).toFixed(2)}`;
        dsBalance.innerHTML = `$ ${Number(dados.balance.balance.amount).toFixed(2)}`;
       
    },

    updateBalance: function(requester, type, value){
        const balAmount = dados.balance.balance.amount;
        const payAmount = dados.balance.payable.amount;
        const recAmount = dados.balance.toreceive.amount;
   
        if(type == 'Deposit' || type == 'rec'){
            dados.balance.balance.amount =
            Number(balAmount) + Number(value);
        }else if(type == 'Withdraw' || type == 'pay'){
            dados.balance.balance.amount =
            Number(balAmount) - Number(value);
        }
        if(requester == 'Bills'){
            if(type == 'rec'){
                dados.balance.toreceive.amount =
                Number(recAmount) + Number(value)
            }else{
                dados.balance.payable.amount =
                Number(payAmount) - Number(value)
            }
        };
        
        this.loadBalance();
        this.loadEntrys();
        this.loadBills();
    },
    radomId: function(requester){
        min = Math.ceil(1);
        max = Math.floor(10000);
        let randomResult = Math.floor(Math.random() * (max - min));
        let prefix;

        switch(requester){
            case 'Bills':
                prefix = 'Bi';
                break;
            case 'Entrys':
                prefix = 'En'
                break;
            default:
                prefix = 'I'
                break;
        }
        return `${prefix}${randomResult}`
    },
    
    filterEntrys: function(type, stateDep, stateWith, element){
        if(checkDep.checked == stateDep && checkWith.checked == stateWith) 
        return Dashboard.loadEntrys(type);

        !checkDep.checked && !checkWith.checked ? 
        element.preventDefault(): Dashboard.loadEntrys();
    },
    filterBills: function(type, stateRec, statePay, element){
        if(checkRec.checked == stateRec && checkPay.checked == statePay)
            return Dashboard.loadBills(type);
        
        !checkPay.checked && !checkRec.checked ? 
        element.preventDefault() : Dashboard.loadBills()
    },

    tableRightClick: function(event, index, table){
       
        /*Remove selected item from array 'dados.summary', reload,
        update amount in 'dados.balance' and, last of all,
        update datas in screen */
        const selectedRow = event.target.closest('tr');

        const regex = /\>\d+\.?\d*\</;
        if(!regex.test(selectedRow.innerHTML)) return
        
        let selectedRow_Id = selectedRow.id;
        let listItem = document.querySelectorAll(`#${selectedRow_Id} td`)
        let value = (Number(listItem[index].innerHTML))
        const type = selectedRow.getAttribute('class');
        
        if(table == 'entrys'){
            this.deleteListItem(dados.summaryEntrys, selectedRow_Id)
            if(type != 'Deposit'){
                this.updateBalance('entrys','Deposit', value) 
            }else{
                this.updateBalance('entrys','Withdraw', value);
            }
           
        }else{
            this.deleteListItem(dados.Bills, selectedRow_Id)
            if(type == 'rec'){
                this.updateBalance('Bills', 'rec', value)
            }else{
                this.updateBalance('Bills', 'pay', value)
            }
        }
        boxDeleteItem.style.display = 'none';
    },

    deleteListItem: function(vetor, id){
        const index = vetor.findIndex(element => element.id == id)
        vetor.forEach(element => {
            if(element.id == id){
                if(vetor == dados.Bills){
                    if(element.installment !== 'single'){
                        if(element.installment == element.installmentTotal){
                            vetor.splice(index,1)
                        }else{
                            element.installment = `${Number(element.installment) + 1 }`
                        }  
                    }else{
                        vetor.splice(index,1)
                    }
                    this.fromBillsToEntrys(element)
                }else{
                    vetor.splice(index,1)
                } 
            }
        })
    },
    fromBillsToEntrys:function(element){
        const regexMonth = /\/\d+\//
        const regexYear = /\d+$/

        let year = regexYear.exec(element.date);
        let monthString = regexMonth.exec(element.date);
        let month = Number(monthString[0].replace(/\//g, ''));
        month = month + 1;

        const billToEntry = {
            category:'Bills',
            description: element.fonte,
            amount:element.amount,
            date: tday(),
            type:  element.type == 'rec' ? 'Deposit' : 'Withdraw',
            id: element.id
        };

       /*if month is greater than 12, it becomes 1 and add 1 in year*/
        if(month > 12){ 
            year = Number(year) + 1;
            month = 1
        }
        month < 10 ? month = `0${month}` : month;
        element.date = element.date.slice(0,-2) + year.toString()

        element.date = element.date.replace(monthString, `/${month.toString()}/`)
        dados.summaryEntrys.push(billToEntry);
    },
};

Dashboard.loadEntrys();
Dashboard.loadBalance();
Dashboard.loadBills();
entryDatas.loadCategory();

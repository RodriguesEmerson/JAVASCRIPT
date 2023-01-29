//Add New Container
let openAddNew = document.querySelector('.add-new-visible')
let AddNewDatas = document.querySelector('.add-new-datas')
let textAddNew = document.querySelector('#add-new-text')
let btn_AddNew = document.querySelector('.add-button')

//List
let list = document.querySelector('.list')
let listItem = document.querySelectorAll('.list-item')
let textItem = document.querySelectorAll('.item-text')
let editTextItem = document.querySelectorAll('.item-edit-input')
let btn_editItem = document.querySelectorAll('.item-edit-button')
let btn_deletItem = document.querySelectorAll('.item-delet-button')

openAddNew.addEventListener('click', function(){
    AddNewDatas.classList.toggle('open-datas')
})


btn_AddNew.addEventListener('click', function(){
    
    let posiNewItem = listItem.length
    console.log(posiNewItem)
   
    let new_ListItem = document.createElement('li')
    new_ListItem.setAttribute('class', 'list-item')

    let new_divOne = document.createElement('div')
    let new_divTwo = document.createElement('div')

    let new_CheckBox = document.createElement('input')
    new_CheckBox.setAttribute('type', 'checkbox')
    new_CheckBox.setAttribute('class', 'check-done')

    let new_Label = document.createElement('label')
    new_Label.setAttribute('class', 'label-checkbox')

    let new_TextItem = document.createElement('p')
    new_TextItem.setAttribute('class', 'item-text')
    new_TextItem.textContent = textAddNew.value

    let new_EditTextItem = document.createElement('input')
    new_EditTextItem.setAttribute('type', 'text')
    new_EditTextItem.setAttribute('class', 'item-edit-input')

    let new_BtnEditItem = document.createElement('span')
    new_BtnEditItem.setAttribute('class', 'material-symbols-outlined item-edit-button')
    new_BtnEditItem.textContent = 'edit_square'

    let new_BtnDeletItem = document.createElement('span')
    new_BtnDeletItem.setAttribute('class', 'material-symbols-outlined item-delet-button')
    new_BtnDeletItem.textContent = 'delete'

    list.appendChild(new_ListItem)
        new_ListItem.appendChild(new_divOne)
            new_divOne.appendChild(new_CheckBox)
            new_divOne.appendChild(new_Label)
            new_divOne.appendChild(new_TextItem)
            new_divOne.appendChild(new_EditTextItem)
        new_ListItem.appendChild(new_divTwo)
            new_divTwo.appendChild(new_BtnEditItem)
            new_divTwo.appendChild(new_BtnDeletItem)
            


})
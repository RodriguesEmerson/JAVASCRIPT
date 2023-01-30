var newID = 1


//Add New Container
let openAddNew = document.querySelector('.add-new-visible')
let AddNewDatas = document.querySelector('.add-new-datas')
let textAddNew = document.querySelector('#add-new-text')
let btn_AddNew = document.querySelector('.add-button')

//List
let list = document.querySelector('.list')

openAddNew.addEventListener('click', function(){
    AddNewDatas.classList.toggle('open-datas')
})

btn_AddNew.addEventListener('click', function(){
    conditionCreateElements()      
})

textAddNew.addEventListener('keydown', function(e){

   if(e.code == 'Enter'){
        conditionCreateElements()
   }else{
        textAddNew.style.borderBottom = '1px solid gray'
        textAddNew.setAttribute('placeholder', 'Descrição')
   }
    
})
function conditionCreateElements(){

    if(textAddNew.value.length == 0){
        textAddNew.style.borderBottom = '1px solid red'
        textAddNew.setAttribute('placeholder', 'Digite a descrição do novo item da lista!')
        
        textAddNew.focus()
    }else{
        CreateElements()
    }   
    textAddNew.value = ''
}

function CreateElements(){

    let new_ListItem = document.createElement('li')
    new_ListItem.setAttribute('class', `list-item list-item-${newID}`)
    new_ListItem.setAttribute('id', newID)

    let new_divOne = document.createElement('div')
    let new_divTwo = document.createElement('div')

    let new_CheckBox = document.createElement('input')
    new_CheckBox.setAttribute('type', 'checkbox')
    new_CheckBox.setAttribute('class', 'check-done')
    new_CheckBox.setAttribute('id', `check-done-${newID}`)

    let new_Label = document.createElement('label')
    new_Label.setAttribute('class', 'label-checkbox')
    new_Label.setAttribute('for', `check-done-${newID}`)

    let new_TextItem = document.createElement('p')
    new_TextItem.setAttribute('class', 'item-text open')
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

    //console.log(list.children.length
    newID++
    atualizaLocalStorage()
}
list.addEventListener('click', function(element){
    let clickedElement = element.target.closest('li')
    let childElement = element.target
    let fatherLi = clickedElement.getAttribute('id')

    let listItem = document.querySelector(`.list-item-${fatherLi}`)
    console.log(listItem)
    let textItem = document.querySelector(`.list-item-${fatherLi} .item-text`)
    let editTextItem = document.querySelector(`.list-item-${fatherLi} .item-edit-input`)
    let btn_editItem = document.querySelector(`.list-item-${fatherLi} .item-edit-button`)
    let btn_deletItem = document.querySelector(`.list-item-${fatherLi} .item-delet-button`)
    let checkbox = document.querySelector(`.list-item-${fatherLi} .check-done`)

    if(childElement.classList.contains('item-delet-button')){
       list.removeChild(listItem)
    }else if(childElement.classList.contains('item-edit-button')){
        
        if(textItem.classList.contains('open')){
            textItem.classList.remove('open')
            editTextItem.classList.add('open')
            editTextItem.value = textItem.textContent
            editTextItem.focus()
        }else {
            editTextItem.classList.remove('open')
            textItem.classList.add('open')
           
            if(editTextItem.value.length != 0){
                textItem.textContent = editTextItem.value
            }
        }
    }else if(childElement.classList.contains('check-done')){
        if(checkbox.classList.contains('checked')){
            checkbox.classList.remove('checked')
            checkbox.removeAttribute('checked')
        }else{
            checkbox.classList.add('checked')
            checkbox.setAttribute('checked','')
        }
    }
    atualizaLocalStorage()
})
function carregaList(){
    list.innerHTML = localStorage.getItem('listDatas')
    if(localStorage.getItem('newID') === null){
        newID = 1
    }else{
        newID = localStorage.getItem('newID')
    }
}
function atualizaLocalStorage(){
    localStorage.clear()
    localStorage.setItem('listDatas', list.innerHTML)
    localStorage.setItem('newID', newID)
}
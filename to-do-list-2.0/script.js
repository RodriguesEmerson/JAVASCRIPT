let openAddNew = document.querySelector('.add-new-visible')
let AddNewDatas = document.querySelector('.add-new-datas')
let textAddNew = document.querySelector('#add-new-text')
let btn_AddNew = document.querySelector('.add-button')
let list = document.querySelector('.list')
let listItem = document.querySelector('.list-item')

let datas = [
    //{id: '5', status: '', content: ''},
]

btn_AddNew.addEventListener('click', () => {
    
    list.innerHTML = ''
    datas.push({
        id: `l${randomId()}`, 
        status: '', 
        content: textAddNew.value})

    datas.map(function(elem){
        CreateElements(elem.id, elem.content, elem.status)
    })
})

function randomId(){
    min = Math.ceil(1)
    max = Math.floor(10000)
    return (Math.floor(Math.random() * (max - min ) + min))
}

function UpdateDatas(){
    list.innerHTML = ''
    datas.map(function(elem){
        CreateElements(elem.id, elem.content, elem.status)
    })
}

function CreateElements(id, text, status){

    let new_ListItem = document.createElement('li')
    new_ListItem.setAttribute('class', `list-item list-item-${id}`)
    new_ListItem.setAttribute('id', `${id}`)

    let new_divOne = document.createElement('div')
    let new_divTwo = document.createElement('div')

    let new_CheckBox = document.createElement('input')
    new_CheckBox.setAttribute('type', 'checkbox')
    if(status == 'checked'){new_CheckBox.setAttribute(`checked`,'')}
    new_CheckBox.setAttribute('class', 'check-done')
    new_CheckBox.setAttribute('id', `check-done-${id}`)

    let new_Label = document.createElement('label')
    new_Label.setAttribute('class', 'label-checkbox')
    new_Label.setAttribute('for', `check-done-${id}`)

    let new_TextItem = document.createElement('p')
    new_TextItem.setAttribute('class', 'item-text open')
    new_TextItem.textContent = text

    let new_EditTextItem = document.createElement('input')
    new_EditTextItem.setAttribute('type', 'text')
    new_EditTextItem.setAttribute('maxlength', '40')
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

    DelEdit(new_BtnDeletItem, new_BtnEditItem, new_Label) 
    //Add a eventListener
}

function DelEdit(delButton, editButton, checkBox){
    delButton.addEventListener('click', (e) => {
        let fatherId = findFather(e)
        datas = datas.filter( e => e.id != fatherId)
        UpdateDatas()
    })

    editButton.addEventListener('click', (e) => {
        let fatherId = findFather(e)
        let editInput = document.querySelector(`#${fatherId} .item-edit-input`) 
        let texItem = document.querySelector(`#${fatherId} .item-text`)

        if(texItem.classList.contains('open')){
            e.srcElement.innerHTML = 'Done'
            texItem.classList.remove('open')
            editInput.classList.add('open')
            editInput.value = texItem.textContent
            editInput.focus()
        }else{
            e.srcElement.innerHTML = 'edit_square'
            editInput.classList.remove('open')
            texItem.classList.add('open')
            if(editInput.value == '') return
            texItem.textContent = editInput.value
        }
    })

    checkBox.addEventListener('click', (e) =>{
        let fatherId = findFather(e)
        datas.find( v => {
            if(v.id == fatherId){
                if(v.status == '') return v.status = 'checked'
                return v.status = ''
            } 
        })
    })
}

function findFather(f){
    let listItem = f.target.closest('li')
    return listItem.getAttribute('id')
}




let list = document.querySelector('.list')
function CreateElements(id, text, status){

    let new_ListItem = document.createElement('li')
    new_ListItem.setAttribute('class', `list-item`)
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
id = 'l1'
let aArray = [
    {element:'li', typeAtt1: 'class', att1:`list-item`, typeAtt2: 'id', att2: `${id}`, 
    typeAtt3: '', att3: '', typeAtt4: '', att4: ''},

    {element:'div', typeAtt1: 'class', att1:`123`, typeAtt2: '', att2: ``, 
    typeAtt3: '', att3: '', typeAtt4: '', att4: ''},

    {element:'input', typeAtt1: 'type', att1:`checkbox`, typeAtt2: 'class', att2: `check-done`, 
    typeAtt3: 'id', att3: `check-done-${id}`, typeAtt4: 'checked', att4: ''},

    {element:'label', typeAtt1: 'class', att1:`label-checkbox`, typeAtt2: 'for', att2: `check-done-${id}`, 
    typeAtt3: '', att3: ``, typeAtt4: '', att4: ''},

    {element:'p', typeAtt1: 'class', att1:`item-text open`, typeAtt2: '', att2: ``, 
    typeAtt3: '', att3: ``, typeAtt4: '', att4: ''},

    {element:'input', typeAtt1: 'type', att1:`text`, typeAtt2: 'maxlength', att2: `40`, 
    typeAtt3: 'class', att3: `item-edit-input`, typeAtt4: '', att4: ''},

    {element:'div', typeAtt1: 'class', att1:`321`, typeAtt2: '', att2: ``, 
    typeAtt3: '', att3: '', typeAtt4: '', att4: ''},

    {element:'span', typeAtt1: 'class', att1:`material-symbols-outlined item-edit-button`, typeAtt2: '', att2: ``, 
    typeAtt3: '', att3: ``, typeAtt4: '', att4: ''},

    {element:'span', typeAtt1: 'class', att1:`material-symbols-outlined item-delet-button`, typeAtt2: '', att2: ``, 
    typeAtt3: '', att3: ``, typeAtt4: '', att4: ''},

]

function aa(){
    aArray.map(function(e){
        console.log(e)
        criar(e.element, e.typeAtt1, e.att1, e.typeAtt2, e.att2, e.typeAtt3, e.att3, e.typeAtt4, e.att4)
    })
}

function criar(p1, tp1, att1, tp2, att2, tp3, att3, tp4, att4){
    let el = document.createElement(p1)
    
    //list.appendChild(el)
    if(p1 == 'li'){ list.appendChild(el) }
    if(p1 == 'div'){
        let listItem = document.querySelector('#l1')
        let li = el.closest('li')
        li.appendChild(el)
    }
    if(p1 == 'input' || p1 == 'label' || p1 == 'p'){
        let div = document.querySelector('div')
        div.appendChild(el)
    }
    
    
    if (att1 != ''){ el.setAttribute(tp1, att1)}
    if (att2 != ''){ el.setAttribute(tp2, att2)}
    if (att3 != ''){ el.setAttribute(tp3, att3)}
    if (att4 != ''){ el.setAttribute(tp4, att4)}
     
}


aa()

//console.log(document.querySelector('.list-item'))
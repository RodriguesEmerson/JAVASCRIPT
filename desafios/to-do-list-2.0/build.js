//===================================================================//
//       ESTUDOS DE MANIPULAÇÃO DE OBJETOS, DOM E PARÂMETROS         //
//===================================================================//
let list = document.querySelector('.list')
function randomId(){
    min = Math.ceil(1)
    max = Math.floor(10000)
    return (Math.floor(Math.random() * (max - min) + min))
}

let dados = [
    {id: `l${randomId()}`, status: 'checked', content: 'Test1'},
    {id: `l${randomId()}`, status: '', content: 'Test2'},
]
function bb(){
    for(let ind = 0; ind < dados.length; ind++){
        aArray.map(function (e){
        
            if (e.element == 'li'){ e.att2 = dados[ind].id}
            if(e.att1 == 'checkbox'){
                e.att3 = `check-done-${dados[ind].id}`; 
                e.status = dados[ind].status
            }
            if(e.element == 'label'){e.att2 = `check-done-${dados[ind].id}`}
            if(e.content == 'edit_square'){
                if(dados[ind].content != "edit_square"){}
                if(dados[ind].content != "Done"){}
            }
            if(e.element == 'p'){
                e.content = dados[ind].content
                if(dados[ind].content == "edit_square"){ e.content = ''}
                if(dados[ind].content == "Done"){e.content = ''}
                if(dados[ind].content == "delete"){e.content = ''}
                
            }

            criar(e.element, e.typeAtt1, e.att1, e.typeAtt2, e.att2, e.typeAtt3, e.att3, e.typeAtt4, e.att4, e.status, e.content)
        })
    }
} 



let aArray = [
    {element:'li', typeAtt1: 'class', att1:`list-item`, typeAtt2: 'id', att2: ``, 
    typeAtt3: '', att3: '', typeAtt4: '', att4: '', status: '', content: ''},

    {element:'div', typeAtt1: '', att1:``, typeAtt2: '', att2: ``, 
    typeAtt3: '', att3: '', typeAtt4: '', att4: '', status: '', content: ''},

    {element:'input', typeAtt1: 'type', att1:`checkbox`, typeAtt2: 'class', att2: `check-done`, 
    typeAtt3: 'id', att3: ``, typeAtt4: '', att4: '', status: '', content: ''},

    {element:'label', typeAtt1: 'class', att1:`label-checkbox`, typeAtt2: 'for', att2: ``, 
    typeAtt3: '', att3: ``, typeAtt4: '', att4: '', status: '', content: ''},

    {element:'p', typeAtt1: 'class', att1:`item-text open`, typeAtt2: '', att2: ``, 
    typeAtt3: '', att3: ``, typeAtt4: '', att4: '', status: '', content: ''},

    {element:'input', typeAtt1: 'type', att1:`text`, typeAtt2: 'maxlength', att2: `40`, 
    typeAtt3: 'class', att3: `item-edit-input`, typeAtt4: '', att4: '', status: '', content: ''},

    {element:'div', typeAtt1: '', att1:``, typeAtt2: '', att2: ``, 
    typeAtt3: '', att3: '', typeAtt4: '', att4: '', status: '', content: ''},

    {element:'span', typeAtt1: 'class', att1:`material-symbols-outlined item-edit-button`, typeAtt2: '', att2: ``, 
    typeAtt3: '', att3: ``, typeAtt4: '', att4: '', status: '', content: 'edit_square'},

    {element:'span', typeAtt1: 'class', att1:`material-symbols-outlined item-delet-button`, typeAtt2: '', att2: ``, 
    typeAtt3: '', att3: ``, typeAtt4: '', att4: '', status: '', content: 'delete'},
]


let listItem = ''
let wdiv = ''
function criar(p1, tp1, att1, tp2, att2, tp3, att3, tp4, att4, status, content){
    let el = document.createElement(p1)
    
    if(p1 == 'li') {list.appendChild(el); listItem = el}
    if(p1 == 'div'){listItem.appendChild(el); wdiv = el}
    if(p1 != 'div' && p1 != 'li'){wdiv.appendChild(el)}

    if (att1 != ''){ el.setAttribute(tp1, att1)}
    if (att2 != ''){ el.setAttribute(tp2, att2)} 
    if (att3 != ''){ el.setAttribute(tp3, att3)}
    if (att4 != ''){ el.setAttribute(tp4, att4)}
    if (status != ''){el.setAttribute(status, '')}else{el.removeAttribute(status)}
    if (content != ''){el.textContent = content}
    
}


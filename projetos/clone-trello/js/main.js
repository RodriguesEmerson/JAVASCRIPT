/**Este projeto seria mais fácil com React */
import { 
    domDynamicList, 
    domStaticList, 
    domActiveColumn,
    domTagsBox
} from "./modules/DOM.js";

let dDom = domDynamicList();
let tbDom = domTagsBox();
let acDom = domActiveColumn;
const sDom = domStaticList;

// localStorage.clear()
import { 
    addEvents as dragEvents, 
    getCardInformations 
} from "./drag-drop.js";


import  preAPI  from "./modules/pre-API.js";
let api = preAPI
if(localStorage.getItem('api') !== null){
    api = JSON.parse(localStorage.getItem('api'));
}
export { api };



/**==================================================================================================================================
 *                                               Funções que carregam os cards na tela                                              *
 ===================================================================================================================================*/
                //estre grupo de funões são chamados apenas quando o browser é recarreado. Elas
                //pegam os dados do obj 'api' e os carregam na tela.
function buildColums(apiColumn){

    const newColumn = document.createElement('div');
    newColumn.setAttribute('class', 'list');
    newColumn.setAttribute('id', `${apiColumn.id}`);

    newColumn.innerHTML = `<span class="list-title">${apiColumn.title}</span>
                            <div class="drag-area">
                            <!--Card aqui-->
                            </div>
                            <div class="list-add-item">
                                <div class="show-add-card">
                                    <span class="material-symbols-outlined">
                                        add
                                    </span>
                                    <span>Adicionar um cartão</span>
                                </div>
                                <div class="add-card hiden">
                                    <div class="previa-card">
                                        <!--previa das tags-->
                                        <textarea class="add-card-text" cols="32" 
                                        rows="5" placeholder="Insira um texto"></textarea>
                                    </div>
                                    <div class="box-button-more">
                                        <div>
                                            <button class="add-card-button">Adicionar</button>
                                            <span class="material-symbols-outlined close-add-card">
                                                close
                                            </span>
                                        </div>
                                        <span class="material-symbols-outlined options-add-card">
                                            more_horiz
                                        </span>
                                    </div>
                                </div>
                            </div>`

     sDom.board.appendChild(newColumn);
    buildCards(newColumn, apiColumn);
}

//================================================================================
//================================================================================
                //Quando uma coluna é gerada, esta função é chamada
                //e cria todos os cards da respectiva coluna
function buildCards(column, apiColumn){
// console.log(api)
    let cardsArea = column.querySelector('.drag-area')
    apiColumn.cards.forEach(card => {
        const newCard = document.createElement('div');
        newCard.setAttribute('class', 'list-content');
        newCard.draggable = true;
        const cardTags = buildTags(card.tags);
        newCard.innerHTML = `<span class="material-symbols-outlined 
                             edit-card"> edit </span>
                             <div class="list-square" id="${card.id}">
                                 <span>${card.text}</span>
                             </div>`
                            
        const listSquare = newCard.querySelector('.list-square');
        if(cardTags.innerHTML){ listSquare.prepend(cardTags) };
        cardsArea.appendChild(newCard);
    })
}


//================================================================================
//================================================================================
                //Quando cada card é criado, esta função é chamada
                //e cria todas as tags do repctivo card            
function buildTags(tags){ 
    //carrega as tags para serem mostradas na tela
    if(!tags) return;
    const newTags = document.createElement('div');
    newTags.setAttribute('class', 'tags')
   
    for (let key in tags){
        const newTag = document.createElement('span');
        newTag.setAttribute('class', 'tag');
        newTag.style.backgroundColor = tags[key].color;
        newTags.appendChild(newTag);
    }
        
    return newTags;
}

//================================================================================
//================================================================================
//chama a função para carregar os dados na tela 
for (const column in api.columns){
    buildColums(api.columns[column])
    addEvents()
}


/**==================================================================================================================================
 *                                                    Funções para criar um novo card                                               *
 ===================================================================================================================================*/
 let haveAnOpenNewCardBox = false; 
 let [activeColumn, activeNewCardBox] = [null];
 let tempTags = []; //tags dos cards

 //================================================================================
//================================================================================
                //Abre a caixa para adicionar um novo card
 function showAddCardBox(){
     //Se houver outra AddCard ou boxOptions abertos, os fecha.
     if(haveAnOpenNewCardBox) closeAddCardBox();
     closeCardOptions('boxTags', true)
     removePreviaTagsDiv();
 
     activeColumn = this.closest('.list').id;
     activeNewCardBox = acDom(activeColumn);
     activeNewCardBox.newCardBox.classList.remove('hiden');
     this.classList.add('hiden');
     haveAnOpenNewCardBox = true;
 };
 
//================================================================================
//================================================================================
                //cria a tag quando uma nova tag é clicada
let divPrevTagCreated = false;
let  previaTagsDiv;
function addTags(clickedTag){
    
    const tag = api.tagsOptions[clickedTag];
    if(tbDom.checkboxTag[clickedTag].checked) return removeTags(tag);
    
    //cria a tag na tempTags
    const newObjTag = {
        color: tag.color,
        id: tag.id
    }
    tempTags.push(newObjTag)

    //cria a tag na tela
    if(!divPrevTagCreated){
        previaTagsDiv = document.createElement('div');
        previaTagsDiv.setAttribute('class', 'previa-tags');
        activeNewCardBox.previaCard.prepend(previaTagsDiv);
        divPrevTagCreated = true;
    }else{
        previaTagsDiv = activeNewCardBox.previaCard.querySelector('.previa-tags');
    }

    const previaTagSpan = document.createElement('span');
          previaTagSpan.setAttribute('class', 'tag');
          previaTagSpan.id  = `${tag.id}`
          previaTagSpan.style.backgroundColor = tag.color;  

    previaTagsDiv.appendChild(previaTagSpan);
}

//================================================================================
//================================================================================
            //Remove tags tanto do card na tela quanto da tempTags
function removeTags(tag){
    
    const tagTempToRemove = tempTags.findIndex(obj => obj.id == tag.id);
    tempTags.splice(tagTempToRemove, 1)

    const tagSpanToRemove = previaTagsDiv.querySelector(`#${tag.id}`);
    previaTagsDiv.removeChild(tagSpanToRemove)

}

//================================================================================
//================================================================================
            //Função que cria o card tanto na tela quanto no obj 'api'
function createNewCard(){
    //Cria o novo card na 'api'//
    //Seleciona a coluna da 'api' que será adicionada os dados
    let  columnInsert = function(){
        for (let column in api.columns){
            if(api.columns[column].id == activeColumn){
                return api.columns[column]
            };
        }
    }
    columnInsert = columnInsert();

    if(activeNewCardBox.newCardText.value === "") return;

    //Cria um objeto com os dados do novo card
    //e o insere no objeto na 'api'
    const card = {
        id: `ftr${activeColumn}card${radomId()}`,
        tags: tempTags,
        text: activeNewCardBox.newCardText.value,
    }
    columnInsert.cards.push(card);
    activeNewCardBox.newCardText.value = "";

    //Cria o novo card na tela//
    const activeDragArea = document.querySelector(`#${columnInsert.id} .drag-area`);
    const newTags = buildTags(tempTags)
    let newCard = document.createElement('div')
    newCard.setAttribute('class', 'list-content');
    newCard.draggable = true;

    //InnerHTML do card quando há tags e quando não há.
    if(tempTags.length === 0) tempTags = null;
    if(tempTags){
        newCard.innerHTML = `<span class="material-symbols-outlined 
                             edit-card"> edit </span>
                             <div class="list-square" id="${card.id}">
                                 <div class="tags">${newTags.innerHTML}</div>
                                 <span>${card.text}</span>
                             </div>`
    }else{
        newCard.innerHTML = `<span class="material-symbols-outlined 
                            edit-card"> edit </span>
                             <div class="list-square" id="${card.id}">
                                 <span>${card.text}</span>
                             </div>`
    }
    
    activeDragArea.appendChild(newCard);

    //atualiza as variaveis e eventos
    saveApiInLocalStorange();
    closeCardOptions('boxTags', true)
    removePreviaTagsDiv();
    closeAddCardBox();
    addEvents();    
}

//================================================================================
//================================================================================
function removePreviaTagsDiv(){

    tempTags = [];
    divPrevTagCreated = false;

    //limpas as checkboxs
    tbDom.checkboxTag.forEach(checkbox => {
        checkbox.checked = false;
    })
   
    //remove a div previa-tags temporária, se tiver
    try{
        const  previaTagsDiv = activeNewCardBox.previaCard.querySelector('.previa-tags');
        activeNewCardBox.previaCard.removeChild(previaTagsDiv);
    }catch(err){}
}

//================================================================================
//================================================================================
function closeAddCardBox(){
    activeNewCardBox.newCardBox.classList.add('hiden')
    activeNewCardBox.btnShowNewCardBox.classList.remove('hiden')
    haveAnOpenNewCardBox = false;
};

//================================================================================
//================================================================================
function radomId(){
    const min = Math.ceil(0);
    const max = Math.floor(10000);
    return Math.floor(Math.random() * (max - min) - min)
}


/**==================================================================================================================================
 *                                              Funções que manipulam as opções dos cards                                           *
  ===================================================================================================================================*/
function closeCardOptions(element, closeOptionToo){
    sDom[element].classList.add('hidden');

    if(!closeOptionToo) return;
    sDom.boxCardOptions.classList.add('hidden');
}

//================================================================================
//================================================================================
let boxOptiosX, boxOptiosY;
function openCardOptions(){

    //Colca a caixa de opções na melhor posição
    const elementInfos = getElementPosition(this);
    let x = elementInfos.left - 5;
    let y = elementInfos.top - 7;

    if((x + 270) > window.innerWidth){ x = x - 230 };
    if((y + 180) > window.innerHeight){ y = y - 155};

    [boxOptiosX, boxOptiosY] = [x, y];
    sDom.boxCardOptions.style.left = x + 'px';
    sDom.boxCardOptions.style.top = y + 'px';

    sDom.boxCardOptions.classList.remove('hidden');
}

//================================================================================
//================================================================================
function openBoxTags(){

    if(this.classList.contains('open-tags')){
        sDom.boxTags.classList.remove('hidden');
    }
    //Colca a caixa de tags na melhor posição
    let x = boxOptiosX;
    let y = boxOptiosY;
    const boxTagsInfos = sDom.boxTags.getBoundingClientRect();
    sDom.boxTags.style.left = `${x}px`;
    sDom.boxTags.style.top = `${y - 10}px`;
    if((y + boxTagsInfos.height + 80) > window.innerHeight){
        sDom.boxTags.style.top = `${(window.innerHeight - boxTagsInfos.height - 60)}px`;
    }
}

//================================================================================
//================================================================================
//Cria as tags na caixa de Etiquetas
function buildTagsOptions(){
    
    api.tagsOptions.forEach(tag => {
        const tagLi = document.createElement('li');
        tagLi.setAttribute('class', 'tag-cont');
        
        tagLi.innerHTML = `<input type="checkbox" id="${tag.id}" class="tag-checkbox">
                            <label for="${tag.id}" class="checkbox-label"></label>
                            <span class="tag-color-ball" 
                            style="background-color: ${tag.color}">
                            </span>
                            <div class="tag-color" style="background-color: ${tag.color}">
                            </div>
                            <span class="material-symbols-outlined edit-tag">
                            edit
                            </span>`;
        
        sDom.tagsList.appendChild(tagLi);
    })
    boxTagsEvents();
}
buildTagsOptions()

//================================================================================
//================================================================================
//Retorna as informações do objeto clicado
function getElementPosition(element){
    const elementInfos = element.getBoundingClientRect();
    return elementInfos;
}



/**==================================================================================================================================
 *                                              Funções para editar e excluir os cards                                              *
====================================================================================================================================*/
function deleteCard(){
    
    const card = getCardInformations(this)
    const cards = api.columns[card.sourceColumn].cards;

    //remove o card do obj 'api'
    const indexOfCard = cards.findIndex(objCard => objCard.id === card.cardId);
    cards.splice(indexOfCard, 1);
   
    //remove o card da tela.
    const cardToDele = document.querySelector(`#${card.sourceColumnID} #${card.cardId}`)
    cardToDele.remove();


    saveApiInLocalStorange();
}



//================================================================================
//================================================================================
function editCard(){

    //pega todas as informações do card clicado, desde a posião ate o objeto na 'api'
    const cardPosition = getElementPosition(this.closest('.list-content')); 
    const cardInfo = getCardInformations(this);
    const cards = api.columns[cardInfo.sourceColumn].cards;
    const card = cards.find(obj => obj.id === cardInfo.cardId);

    //coloca o modal de edição do card na melhor posição
    sDom.boxEditCard.classList.remove('hidden');
    sDom.editCardContainer.style.top = `${cardPosition.top}px`;
    sDom.editCardContainer.style.left = `${cardPosition.left}px`;

    sDom.editBoxCardOptions.style.top = `${cardPosition.top}px`;
    sDom.editBoxCardOptions.style.left = `${cardPosition.left + 285}px`

    console.log(cardPosition.top)
}



//================================================================================
//================================================================================
export function saveApiInLocalStorange(){

    localStorage.clear();
    const apiString = JSON.stringify(api)
    localStorage.setItem('api', apiString);

}


/**==================================================================================================================================
 *                                                              Eventos                                                             *
 ===================================================================================================================================*/
 sDom.btnBackBoxCardOptions.addEventListener('click', () => {
    closeCardOptions('boxTags')
})

 sDom.btnCloseBoxTags.addEventListener('click', () => {
    closeCardOptions('boxTags', true)
})

sDom.btnCloseCardOptions.addEventListener('click', () =>{
    closeCardOptions('boxCardOptions')
})

sDom.moreCardOptions.forEach(button => {
    button.addEventListener('click', openBoxTags)
})


dDom.optionsAddCard.forEach(button => {
    button.addEventListener('click', openCardOptions)
})


//Atualiza a seleção domDynamicList e seus eventos
function addEvents(){

    dDom = domDynamicList();
    dragEvents(); //drag-drop.js

    dDom.showAddCard.forEach(button =>{
        button.addEventListener('click', showAddCardBox);
    });
    
    dDom.closeAddCard.forEach(button => {
        button.addEventListener('click', closeAddCardBox)
    });
    
    dDom.newCardBtn.forEach(button => {
        button.addEventListener('click', createNewCard)
    })

    dDom.cards.forEach(card => {
       // card.addEventListener('click', deleteCard)
    })

    dDom.btnEditCards.forEach(button => {
        button.addEventListener('click', editCard)
    })

}
addEvents();

function boxTagsEvents(){
    tbDom = domTagsBox();
    
    for (let i = 0; i < tbDom.fakeCheckboxTag.length; i++){
        tbDom.fakeCheckboxTag[i].addEventListener('click', () => {
            addTags(i);
        })
    }
}   
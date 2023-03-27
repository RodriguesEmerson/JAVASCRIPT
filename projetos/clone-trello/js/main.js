/**Este projeto seria mais fácil com React */
import  preAPI  from "./modules/pre-API.js";
let api = preAPI;
if(localStorage.getItem('api') !== null){
    api = JSON.parse(localStorage.getItem('api'));
}
export { api };
import { loadCards, buildTags } from "./modules/load-cards.js"
import { addEvents as dragEvents, getCardInformations } from "./drag-drop.js";
import { domDynamicList, domStaticList, domActiveColumn, domTagsBox } from "./modules/DOM.js";
import { addTags, removeTags } from "./modules/functions-all-uses.js";

let dDom = domDynamicList();
let tbDom = domTagsBox();
let acDom = domActiveColumn;
const sDom = domStaticList;

// localStorage.clear()
loadCards();

/**==================================================================================================================================
 *                                                    Funções para criar um novo card                                               *
 ===================================================================================================================================*/
 let [haveAnOpenNewCardBox , editingMode] = [false]; 
 let [activeColumn, activeNewCardBox] = [null];
 let tempTags = []; //tags dos cards
 export {
         activeNewCardBox,
         tempTags,
         editingMode
     }
 
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
function openBoxTags(event){

    sDom.boxTags.classList.remove('hidden');

    //Colca a caixa de tags na melhor posição
    let x = boxOptiosX;
    let y = boxOptiosY;

    //verifica se quem está chamando a função é o botão de editar tags
    //ou o botar de criar tags na caixa de criar um novo card.
    if(event.target.closest('.option-item').classList.contains('edit')){
        const btnIfons = sDom.boxEditCardOptions[1].getBoundingClientRect();
        x = btnIfons.left;
        y = btnIfons.top - 17;
    }
    
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
let cardInEdition, tempEditingTags, tempEditingThumb;
function openModalCardEdit(){

    editingMode = true;
    //pega todas as informações do card clicado
    const clickedCard = getCardInformations(this);
    const cards = api.columns[clickedCard.sourceColumn].cards;
    const card = cards.find(obj => obj.id === clickedCard.cardId);
    cardInEdition = card;
    tempEditingTags = [...card.tags];
    tempEditingThumb = card.thumb;

    //coloca o modal de edição do card na melhor posição
    const cardPosition = getElementPosition(this.closest('.list-content')); 
    sDom.boxEditCard.classList.remove('hidden');
    sDom.editCardContainer.style.top = `${cardPosition.top}px`;
    sDom.editCardContainer.style.left = `${cardPosition.left}px`;

    sDom.editBoxCardOptions.style.top = `${cardPosition.top}px`;
    sDom.editBoxCardOptions.style.left = `${cardPosition.left + 285}px`

    //Carrega os dados do card no modal de edição
    sDom.editCardText.value = card.text;
    if(card.tags.length > 0){
        sDom.editCardPreTags.innerHTML = "";
        card.tags.forEach(tag => {
            sDom.editCardPreTags.innerHTML += 
                    `<span class="editing-tag"                       
                    style="background-color: ${tag.color};"                           
                    id="${tag.id}"></span>`;
        })
    }

    if(card.thumb !== ''){
        sDom.editCardThumb.style.backgroundColor = card.thumb;
    }
}

//================================================================================
//================================================================================
function saveCardEdition(){


}


//================================================================================
//================================================================================
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
function txtAreaAutoResize(event){
    this.style.height = 'auto';
    const sHeight = event.target.scrollHeight
    this.style.height = `${sHeight}px`;
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
    closeCardOptions('boxTags');
})

 sDom.btnCloseBoxTags.addEventListener('click', () => {
    closeCardOptions('boxTags', true);
})

sDom.btnCloseCardOptions.addEventListener('click', () =>{
    closeCardOptions('boxCardOptions')
})

sDom.moreCardOptions.forEach(button => {
    button.addEventListener('click', openBoxTags);
})

sDom.editCardText.addEventListener('input', txtAreaAutoResize);

for (let i = 0; i < sDom.boxEditCardOptions.length; i++){
    sDom.boxEditCardOptions[i].addEventListener('click', (event) => {
        switch (i) {
            case 0:
                
                break;
            case 1:
                openBoxTags(event);
                break;
            default:
                break;
        }
    })
}

//Atualiza a seleção domDynamicList e seus eventos
export function addEvents(){

    dDom = domDynamicList();
    dragEvents(); //drag-drop.js

    dDom.showAddCard.forEach(button =>{
        button.addEventListener('click', showAddCardBox);
    });
    
    dDom.closeAddCard.forEach(button => {
        button.addEventListener('click', closeAddCardBox);
    });
    
    dDom.newCardBtn.forEach(button => {
        button.addEventListener('click', createNewCard);
    });

    dDom.cards.forEach(card => {
    //    card.addEventListener('click', deleteCard);
    });

    dDom.btnEditCards.forEach(button => {
        button.addEventListener('click', openModalCardEdit);
    });

    dDom.optionsAddCard.forEach(button => {
        button.addEventListener('click', openCardOptions);
    });

    dDom.newCardText.forEach(textArea => {
        textArea.addEventListener('input', txtAreaAutoResize);
        textArea.addEventListener('keydown', tecla => {
            if (tecla.key === 'Enter') return createNewCard();
        });
        
    });

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
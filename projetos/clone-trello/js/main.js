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

let dDom = domDynamicList();
let tbDom = domTagsBox();
let acDom = domActiveColumn;
const sDom = domStaticList;

// localStorage.clear()

loadCards();

/**==================================================================================================================================
 *                                                    Funções para criar um novo card                                               *
 ===================================================================================================================================*/
let [haveAnOpenNewCardBox, 
    divPrevTagCreated, 
    editingMode,
    activeColumn,
    activeNewCardBox
] = [false]; 


//Tags temporárias são armazenadas aqui, só depois de
//clicar no botão de criar um novo card ou savar a edição
//elas são colocadas no lugar das tags do objeto do card.
let tempTags = []; 


export {
        activeNewCardBox,
        tempTags,
        divPrevTagCreated,
        editingMode
    }
 
 //================================================================================
//================================================================================
                //Abre a caixa para adicionar um novo card
function openCreationCardBox(){
    //Se houver outra AddCard ou boxOptions abertos, os fecha.
    if(haveAnOpenNewCardBox) closeCreationCardBox();
    closeCreationCardsOptions('boxTags', true);

    activeColumn = this.closest('.list').id;
    activeNewCardBox = acDom(activeColumn);
    activeNewCardBox.newCardBox.classList.remove('hidden');
    this.classList.add('hidden');
    haveAnOpenNewCardBox = true;
};

//================================================================================
//================================================================================
            //Função que cria o card tanto na tela quanto no obj 'api'
function createNewCard(){

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
        id: `OC${activeColumn}Card${radomId()}`,
        tags: tempTags,
        text: activeNewCardBox.newCardText.value,
    }
    columnInsert.cards.push(card);

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
                                 <span class="card-text">${card.text}</span>
                             </div>`
    }else{
        newCard.innerHTML = `<span class="material-symbols-outlined 
                            edit-card"> edit </span>
                             <div class="list-square" id="${card.id}">
                                 <span class="card-text">${card.text}</span>
                             </div>`
    }
    
    activeDragArea.appendChild(newCard);

    //remove a div previa-tags temporária, se tiver!
    try{
    const  previaTagsDiv = activeNewCardBox.previaCard.querySelector('.previa-tags');
    activeNewCardBox.previaCard.removeChild(previaTagsDiv);
    }catch(err){}

    //atualiza as variaveis e eventos
    saveApiInLocalStorange();
    closeCreationCardsOptions('boxTags', true);
    closeCreationCardBox();
    addEvents();
    activeNewCardBox.newCardText.value = "";
    tempTags = [];    
}

//================================================================================
//================================================================================
function closeCreationCardBox(){
    activeNewCardBox.newCardBox.classList.add('hiden')
    activeNewCardBox.btnShowNewCardBox.classList.remove('hiden')
    haveAnOpenNewCardBox = false;
};

/**==================================================================================================================================
 *                                                    Funções manipulam a box de tags                                               *
 ===================================================================================================================================*/
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
function closeCreationCardsOptions(box, boxOptionsToo){
    
    sDom[box].classList.add('hidden');
    
    if(!boxOptionsToo) return;
    sDom.boxCardOptions.classList.add('hidden');
    
    //limpas as checkboxs
    tbDom.checkboxTag.forEach(checkbox => {
        checkbox.checked = false;
    })
    
    //Atualiza as variáveis
    editingMode = false;
    tempTags = [];
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
    //Esse try ignora o erro que dá ao tentar pegar a classlist.
    try{
        if(event.target.closest('.type-option').classList.contains('edit')){
            const btnIfons = sDom.boxEditCardOptions[1].getBoundingClientRect();
            x = btnIfons.left;
            y = btnIfons.top - 50;
        }}catch(err){}
        
        const boxTagsInfos = sDom.boxTags.getBoundingClientRect();
        const boadWidth = sDom.board.offsetWidth;
  
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
 *                                Funções que manipulam as opções do modal de edição dos cards                                      *
====================================================================================================================================*/

let [cardInEdition,          //Objeto do card em edição na 'api'
    tempEditingThumb,        //Thumb do card
    activeEditingCardDiv,    //Div do card no DOM
    cardsGroup               //Grup de cards em que o card está.
] = [null];

function openModalCardEdit(){
    
    sDom.boxEditCard.classList.remove('hidden');
    
    editingMode = true;
    //pega todas as informações do card clicado
    const clickedCard = getCardInformations(this);
    const cards = api.columns[clickedCard.sourceColumn].cards;
    const card = cards.find(obj => obj.id === clickedCard.cardId);

    cardsGroup = cards;
    cardInEdition = card;
    tempTags = [...card.tags];
    tempEditingThumb = card.thumb;
    activeEditingCardDiv = this.closest('.list-content');

    //coloca o modal de edição do card na melhor posição
    const cardPosition = getElementPosition(this.closest('.list-content')); 
    
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
                `<span class="editing-tag ${tag.id}"                       
                style="background-color: ${tag.color};"">
                </span>`;
                
                //Pre carrega as tags do card na caixa de seleção de tags
                const indexTag = api.tagsOptions.findIndex(obj => obj.id === tag.id);
                tbDom.checkboxTag[indexTag].checked = true;
                    
            });
        }
            
    if(card.thumb !== ''){
        sDom.editCardThumb.style.backgroundColor = card.thumb;
    }
}

//================================================================================
//================================================================================
let  activeTagsDiv = sDom.editCardPreTags;
function addTags(clickedTag){

    const tag = api.tagsOptions[clickedTag];
    
    let classe = 'tag';
    if(tbDom.checkboxTag[clickedTag].checked) return removeTags(tag);

    //Cria ou seleciona a div de tags do card que está sendo criado
    if(!editingMode){
        if(!divPrevTagCreated){
            activeTagsDiv = document.createElement('div');
            activeTagsDiv.setAttribute('class', 'previa-tags');
            activeNewCardBox.previaCard.prepend(activeTagsDiv);
            divPrevTagCreated = true;
        }else{
            activeTagsDiv = activeNewCardBox.previaCard.querySelector('.previa-tags');
        }
    }
    
    //Se o card estiver sendo editado, seleciona a div de edição de tags
    if(editingMode){
        activeTagsDiv = sDom.editCardPreTags;
        classe = 'editing-tag';
    }
    
    //cria a tag na tempTags
    const newObjTag = {
        color: tag.color,
        id: tag.id
    }
    tempTags.push(newObjTag)

    //cria a tag na tela
    const previaTagSpan = document.createElement('span');
            previaTagSpan.setAttribute('class', `${classe}`);
            previaTagSpan.classList.add(`${tag.id}`);
            previaTagSpan.style.backgroundColor = tag.color;  

    activeTagsDiv.appendChild(previaTagSpan);
}

//================================================================================
//================================================================================
            //Remove tags tanto do card na tela quanto da tempTags
function removeTags(tag){

    const cardCont = activeTagsDiv;
    const tagTempToRemove = tempTags.findIndex(obj => obj.id == tag.id);
    tempTags.splice(tagTempToRemove, 1)

    const tagSpanToRemove = cardCont.querySelector(`.${tag.id}`);
    cardCont.removeChild(tagSpanToRemove)
}


/**==================================================================================================================================
 *                                              Funções para editar e excluir os cards                                              *
====================================================================================================================================*/

        
//================================================================================
//================================================================================
function saveCardEdition(){
            
    //constroi a div de tags
    const tags = buildTags(tempTags);

    const oldTags = activeEditingCardDiv.querySelector('.tags');
    const oldText = activeEditingCardDiv.querySelector('.card-text');
    console.log( activeEditingCardDiv)
    //salva as edições do card no obj 'api' e atualiza a tela;
    cardInEdition.tags = tempTags;
    if (sDom.editCardText.value !== ''){
        cardInEdition.text = sDom.editCardText.value;
        oldText.textContent = sDom.editCardText.value;
    };

    //Se tiver uma div de tags com tags, a subtitui pela nova div de tags
    if(oldTags){
        oldTags.parentNode.replaceChild(tags, oldTags);
    }else{
        //se não tiver, cria a div .tags
        if(tags.innerHTML.length != 0){ 
            activeEditingCardDiv.querySelector('.list-square').prepend(tags)
        }
    }
    
    sDom.boxEditCard.classList.add('hidden');
    sDom.editCardPreTags.innerHTML = '';
    saveApiInLocalStorange();
    closeCreationCardsOptions('boxTags', true);
    
}


//================================================================================
//================================================================================
function deleteCard(){
    
    //remove o card do obj 'api'
    const indexOfCard = cardsGroup.findIndex(objCard => objCard.id === cardInEdition.id);
    cardsGroup.splice(indexOfCard, 1);
    
    //remove o card da tela.
    activeEditingCardDiv.remove();
    
    sDom.boxEditCard.classList.add('hidden');
    saveApiInLocalStorange();
    closeCreationCardsOptions('boxTags', true);
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

//================================================================================
//================================================================================
function radomId(){
    const min = Math.ceil(0);
    const max = Math.floor(10000);
    return Math.floor(Math.random() * (max - min) - min)
}

/**==================================================================================================================================
 *                                                              Eventos                                                             *
 ===================================================================================================================================*/
 sDom.btnBackBoxCardOptions.addEventListener('click', () => {
    closeCreationCardsOptions('boxTags');
})

 sDom.btnCloseBoxTags.addEventListener('click', () => {
    closeCreationCardsOptions('boxTags', true);
})

sDom.btnCloseCardOptions.addEventListener('click', () =>{
    closeCreationCardsOptions('boxCardOptions')
})

sDom.moreCardOptions.forEach(button => {
    button.addEventListener('click', openBoxTags);
})

sDom.editCardText.addEventListener('input', txtAreaAutoResize);

sDom.boxEditCardOptions[0].addEventListener('click', openBoxTags);

sDom.boxEditCardOptions[2].addEventListener('click', deleteCard);



sDom.btnSaveEditedCard.addEventListener('click', saveCardEdition)


//Atualiza a seleção domDynamicList e seus eventos
export function addEvents(){

    dDom = domDynamicList();
    dragEvents(); //drag-drop.js

    dDom.showAddCard.forEach(button =>{
        button.addEventListener('click', openCreationCardBox);
    });
    
    dDom.closeAddCard.forEach(button => {
        button.addEventListener('click', closeCreationCardBox);
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
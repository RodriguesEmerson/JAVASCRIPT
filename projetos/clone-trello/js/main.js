import { domDynamicList, domStaticList, domActiveColumn } from "./modules/DOM.js"
import  api  from "./modules/pre-API.js"

let dDom = domDynamicList();
let acDom = domActiveColumn;
const sDom = domStaticList;


function radomId(){
    const min = Math.ceil(0);
    const max = Math.floor(10000);
    return Math.floor(Math.random() * (max - min) - min)
}

/**=================================================================================
 *                        Funções que criam os cards na tela                       *
 ==================================================================================*/
/**Isso seria mais fácil e mais seguro com React */
function buildColums(apiColumn){

    const newColumn = document.createElement('div');
    newColumn.setAttribute('class', 'list');
    newColumn.setAttribute('id', `${apiColumn.id}`);

    newColumn.innerHTML = `<span class="list-title">${apiColumn.title}</span>
                            <div class="drag-area">
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

     dDom.board.appendChild(newColumn);
    buildCards(newColumn, apiColumn);
}

//<div class="previa-tags"><span class="tag"</span></div>

function buildCards(column, apiColumn){

    let cardsArea = column.querySelector('.drag-area')
    apiColumn.cards.forEach(card => {
        const newCard = document.createElement('div');
        newCard.setAttribute('class', 'list-content');
        newCard.draggable = true;

        const cardTags = buildTags(card.tags);
        newCard.innerHTML = `<div class="list-square" id="${card.id}">
                                <span>${card.text}</span>
                            </div>`
                            
        const listSquare = newCard.querySelector('.list-square');
        if(cardTags.innerHTML){ listSquare.prepend(cardTags) };
        cardsArea.appendChild(newCard);
    })
}

function buildTags(tags){ 
    //cria as tags para serem mostradas na tela
    if(!tags) return;
    const newTags = document.createElement('div');
    newTags.setAttribute('class', 'tags')

    tags.forEach(tag => {
        const newTag = document.createElement('span');
        newTag.setAttribute('class', 'tag');
        newTag.style.backgroundColor = tag;
        newTags.appendChild(newTag);
    })
    return newTags;
}

//chama a função para criar cada coluna 
for (const column in api){
    buildColums(api[column])
    addEvents()
}


/**=================================================================================
 *                        Funções para criar um novo card                         *
 =================================================================================*/
 let haveAnOpenNewCardBox = false; 
 let [activeColumn, activeNewCardBox] = [null];
 let tempTags = null; //tags dos cards


 function showAddCardBox(){
     //Se houver outra AddCard ou boxOptions abertos, os fecha.
     if(haveAnOpenNewCardBox) closeAddCardBox();
     closeCardOptions('boxTags', true)
 
     activeColumn = this.closest('.list').id;
     activeNewCardBox = acDom(activeColumn);
     activeNewCardBox.newCardBox.classList.remove('hiden');
     this.classList.add('hiden');
     haveAnOpenNewCardBox = true;
 };


function createNewCard(){

    const fatherColumn = this.closest('.list').id;
    //const newCardText = document.querySelector(`#${fatherColumn} .add-card-text`);

    //Seleciona a coluna da 'api' que será adicionada os dados
    let  columnInsert = function(){
        for (let column in api){
            if(api[column].id == fatherColumn){
                return api[column]
            };
        }
    }
    columnInsert = columnInsert();

    if(activeNewCardBox.newCardText.value === "") return;//condição

    //Cria um objeto com os dados do novo card
    //e o insere no objeto api
    const card = {
        id: `ftr${fatherColumn}card${radomId()}`,
        tags: tempTags,
        text: activeNewCardBox.newCardText.value,
    }
    columnInsert.cards.push(card);
    activeNewCardBox.newCardText.value = "";

    //Cria o novo card na tela
    const activeColumn = document.querySelector(`#${columnInsert.id} .drag-area`);
    const newTags = buildTags(tempTags)
    let newCard = document.createElement('div')
    newCard.setAttribute('class', 'list-content');
    newCard.draggable = true;

    //InnerHTML do card quando há tags e quando não há.
    if(tempTags){
        newCard.innerHTML = `<div class="list-square" id="${card.id}">
                                 <div class="tags">${newTags.innerHTML}</div>
                                 <span>${card.text}</span>
                             </div>`
    }else{
        newCard.innerHTML = `<div class="list-square" id="${card.id}">
                                 <span>${card.text}</span>
                             </div>`
    }
    
    activeColumn.appendChild(newCard);

    addEvents();
}

function closeAddCardBox(){
    activeNewCardBox.newCardBox.classList.add('hiden')
    activeNewCardBox.btnShowNewCardBox.classList.remove('hiden')
    haveAnOpenNewCardBox = false;
};



/**=================================================================================
 *                     Funções que manipulam as opções dos cards                  *
 =================================================================================*/
function closeCardOptions(element, closeOptionToo){
    sDom[element].classList.add('hidden');

    if(!closeOptionToo) return;
    sDom.boxCardOptions.classList.add('hidden');
}

let boxOptiosX, boxOptiosY;
function openCardOptions(event){

    //active column
    console.log(activeNewCardBox)

    //Colca a caixa de opções na melhor posição
    const mouseX = event.clientX;
    const mouseY = event.clientY;
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

function getElementPosition(element){
    const elementInfos = element.getBoundingClientRect();
    return elementInfos;
}

/**=================================================================================
 *                                       Eventos                                  *
 =================================================================================*/
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
import { addEvents as ddAddEvents } from "./drag-drop.js";
function addEvents(){

    dDom = domDynamicList();
    ddAddEvents(); //drag-drop.js

    dDom.showAddCard.forEach(button =>{
        button.addEventListener('click', showAddCardBox);
    });
    
    dDom.closeAddCard.forEach(button => {
        button.addEventListener('click', closeAddCardBox)
    });
    
    dDom.newCardBtn.forEach(button => {
        button.addEventListener('click', createNewCard)
    })
}
addEvents();
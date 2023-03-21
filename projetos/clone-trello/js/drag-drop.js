import { domList } from "./modules/DOM.js"
import  api  from "./modules/pre-API.js"


let dom = domList();
//Verifica se oube mudanças no DOM, se sim executa o codigo
const observer = new MutationObserver(function(){ addEvents() });
const setting = {childList: true};
observer.observe(dom.board, setting);


let [tempDiv, 
    selectedCard, 
    activeColumnID, 
    origimColumID,
    newCardIndex,
] = [null];
let origimColumSave = false;
function dragStart(){

    tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'tempDiv');
    tempDiv.style.height = `${this.offsetHeight}px`;

    this.classList.add('dragging');
    selectedCard = this;
}

function dragOver(cardEvent){
    //Atualiza a coluna ativada e salva coluna de origem
    activeColumnID = this.closest('.list').id;
    if(!origimColumSave){ 
        origimColumID = activeColumnID; 
        origimColumSave = true
    } 

    selectedCard.style.display = 'none'
    const CardNewPosition = getNewPosition(this, cardEvent.clientY);

    if(CardNewPosition){
        CardNewPosition.insertAdjacentElement('afterend', tempDiv);
    }else{
        this.prepend(tempDiv)
    }
}

function dragEnd(){
    this.classList.remove('dragging');
    this.style.display = 'flex';
    const deleteTemDiv = document.querySelector('.tempDiv');

    saveIndexOfNewCard();

    if(deleteTemDiv){
        deleteTemDiv.parentNode.replaceChild(this, deleteTemDiv);
    }

    atualizaApi(this)
}

function getNewPosition(column, selectedCardTop){
    const availablesCards = column.querySelectorAll('.list-content:not(.dragging)')
    let newPositon = null;

    for (const card of availablesCards){
        const cardSettings = card.getBoundingClientRect();
        const cardTopHalf = cardSettings.y + (cardSettings.height / 2);
        if(selectedCardTop >= cardTopHalf) newPositon = card;
    }
    return newPositon;
}

function addEvents(){
    //Atualiza a seleção DOM
    dom = domList();
    dom.columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
    });
    dom.cards.forEach(card => {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    })
}
addEvents();



function atualizaApi(listContent){
    const cardId = listContent.querySelector('.list-square').id;
    let columnName = document.querySelector(`#${activeColumnID} .list-title`);
    columnName = columnName.textContent;
    columnName = columnName.replace(' ', '_');

    //dados do card que está sendo arrastado
    let dragCard, dragCardIndex = 0;
    (function findDragCard(){
        api[columnName].cards.forEach(card => {
            if(card.id === cardId) return;
            dragCard = card;
            dragCardIndex =api[columnName].cards.indexOf(card);
        })
    })();

    //apaga o card da coluna de origem
    let  origimColum;
    (function findaOrigimColumn(){
        for (let column in api){ 
            if(api[column].id == origimColumID){
            return origimColum = (api[column]);
            };
        }
    })();
    origimColum.cards.splice(dragCardIndex, 1);

  //apaga o card da coluna de origem
    let  activeColumn;
    (function findaOrigimColumn(){
        for (let column in api){ 
            if(api[column].id == activeColumnID){
            return activeColumn = (api[column]);
            };
        }
    })();

    

   origimColumSave = false;
   //console.log(activeColumn)
}

function saveIndexOfNewCard(){
    
    const cardsInActiveColumn = document.querySelectorAll(`#${activeColumnID} .drag-area > div`);
    console.log("Length: " + (cardsInActiveColumn.length - 1))

    for(let i = 0; i < cardsInActiveColumn.length; i++){
        if(cardsInActiveColumn[i].classList.contains('tempDiv')){
            newCardIndex =  i;
        }
    }

    //se for o ultimo card, adiciona 1 ao índice
    if(origimColumID !== activeColumnID && newCardIndex === (cardsInActiveColumn.length - 1)){
        newCardIndex++
    }

    //qualquer índice de card maior que 1 é subtraído 1.
    if(newCardIndex > 1) newCardIndex--
}


/**==========Segunda Versão: Melhorando estrutura do código e nomes de variáveis ==============*/

// let [listItems, columns, tempDiv, elementMoving] = [null];
// (function selector(){
//     listItems = document.querySelectorAll('.list-content');
//     columns = document.querySelectorAll('.drag-area');
// })();

// function dragStart(){
//     tempDiv = document.createElement('div');
//     tempDiv.setAttribute('class', 'tempDiv');
//     tempDiv.style.height = `${this.offsetHeight}px`;
//     this.classList.add('dragging');
//     elementMoving = this;
// }

// function dragEnd(){
//     this.classList.remove('dragging');
//     this.style.display = 'flex';
//     const tempDivToDelete = document.querySelector('.tempDiv');
//     tempDivToDelete.parentNode.replaceChild(elementMoving, tempDivToDelete);
// }

// function dragOver(card) {
//     const draggingMoving = document.querySelector('.dragging');
//     draggingMoving.style.display = 'none';
//     const applayAfter = getNewPosition(this, card.clientY);

//     if(applayAfter){
//         applayAfter.insertAdjacentElement('afterend', tempDiv);
//     }else{
//         this.prepend(tempDiv);
//     }
// }

// function getNewPosition(column, cardPositionY){
//     const cards = column.querySelectorAll('.list-content:not(.dragging)')
//     let newPosition = null;

//     for (const card of cards){
//         const cardSettings = card.getBoundingClientRect();
//         const cardTophalf = cardSettings.y + (cardSettings.height / 2);

//         if(cardPositionY >= cardTophalf) newPosition = card;
//     }
//     return newPosition;
// }

// columns.forEach(column => {
//     column.addEventListener('dragover', dragOver)
// });

// listItems.forEach(listItem => {
//     listItem.addEventListener('dragstart', dragStart);
//     listItem.addEventListener('dragend', dragEnd)
// })






/**=====================Primeira Versão: Implemantando lógica==============================*/

// let [listItem, column, tempDiv, elementMoving] = [null];
// (function selector(){
//     listItem = document.querySelectorAll('.list-content');
//     column = document.querySelectorAll('.drag-area');
// })();
// for ( let i = 0; i < listItem.length; i++ ){
//     /**=============DragStart================ */
//     listItem[i].addEventListener('dragstart', () => {
//         tempDiv = document.createElement('div')
//         tempDiv.setAttribute('class', 'tempDiv')
//         tempDiv.style.height = listItem[i].offsetHeight + 'px'
//         listItem[i].classList.add('dragging')
//     })
//     /**=============DragStart================ */
//     listItem[i].addEventListener('dragend', () => {
//         listItem[i].classList.remove('dragging')
//         listItem[i].style.display = 'flex'
//         let tempDIV = document.querySelector('.tempDiv')
//         tempDIV.parentNode.replaceChild(elementMoving, tempDIV) //substitui a div temporaria 'sombra' 
//     })
// }
// column.forEach( item => {
//     item.addEventListener('dragover', ( element => {
//         let dragging = document.querySelector('.dragging');
//         dragging.style.display = 'none';
//         elementMoving = dragging;
//         let applayAfter = getNewPosition(item, element.clientY);
       
//         if( applayAfter ){
//             applayAfter.insertAdjacentElement('afterend', tempDiv);
//         }else{
//             item.prepend(tempDiv);
//         }
//     }));
// })
// function getNewPosition( column, positionY ){
//     const cards = column.querySelectorAll('.list-content:not(.dragging');
//     let result;

//     for (let refer_card of cards){
//         const box = refer_card.getBoundingClientRect();
//         const boxCenterY = box.y + box.height / 2;
        
//         if( positionY >= boxCenterY ) result = refer_card;
//     }
//     return result;
// }

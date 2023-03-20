import dom from "./modules/DOM.js"

let [tempDiv, selectedCard] = [null];

function dragStart(){

    tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'tempDiv');
    tempDiv.style.height = `${this.offsetHeight}px`;

    this.classList.add('dragging');
    selectedCard = this;
}

function dragOver(cardEvent){

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

    if(deleteTemDiv){
        deleteTemDiv.parentNode.replaceChild(this, deleteTemDiv);
    }
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

dom.columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
});
dom.cards.forEach(card => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
})












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

import { domList } from "./modules/DOM.js"
import  api  from "./modules/pre-API.js"

let dom = domList();
//Verifica se houve mudanças no DOM e, se sim, executa o codigo
const observer = new MutationObserver(function(){ addEvents() });
const setting = {childList: true};
observer.observe(dom.board, setting);


let [tempDiv, 
    selectedCard, 
    activeColumnID, 
    sourceColumnID,
    sourceColumn,
    destinationIndex,
    sourceCardID,
] = [null];

let sourceColumnSaved = false;
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
    if(!sourceColumnSaved){ 
        sourceColumnID = activeColumnID; 
        saveSelectedCardDatas(selectedCard);
        sourceColumnSaved = true;
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

    saveDestinationIndex();
    if(deleteTemDiv){
        deleteTemDiv.parentNode.replaceChild(this, deleteTemDiv);
    }
    atualizaApi()
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


function atualizaApi(){

    try{
        //dados do card que está sendo arrastado
        let dragCard, originIndexCard;
        (function findDragCardDatas() {
            api[sourceColumn].cards.forEach(card => {
                if(!sourceCardID) return;
                if (card.id === sourceCardID) {                    
                    dragCard = card;
                    originIndexCard = api[sourceColumn].cards.indexOf(card);
                    return;
                }
            });
        })();

        //Encontra e apaga o card da coluna de origem
        (function findOrigimColumn(){
            for (let column in api){ 
                if(api[column].id == sourceColumnID){
                    return sourceColumn = (api[column]);
                };
            }
        })();
        sourceColumn.cards.splice(originIndexCard, 1);

        //Encontra o objeto da coluna ativa na 'api'
        let  activeColumn;
        (function findActiveColumn(){
            for (let column in api){ 
                if(api[column].id == activeColumnID){
                return activeColumn = (api[column]);
                };
            }
        })();

        //Salva o card selecionado na coluna ativa
        activeColumn.cards.splice(destinationIndex, 0, dragCard)

    }catch(err){
        console.log('houve um erro')
    }   

    sourceColumnSaved = false;

}


function saveSelectedCardDatas(listContent){
    const cardId = listContent.querySelector('.list-square').id;
    sourceCardID = cardId;
    let columnName = document.querySelector(`#${sourceColumnID} .list-title`);
    columnName = columnName.textContent;
    sourceColumn = columnName.replace(' ', '_');
    
}

function saveDestinationIndex(){
    const cardsInActiveColumn = document.querySelectorAll(`#${activeColumnID} .drag-area > div`);
    for(let i = 0; i < cardsInActiveColumn.length; i++){
        if(cardsInActiveColumn[i].classList.contains('tempDiv')){
            destinationIndex =  i;
            break;
        }
    }
    //se for o ultimo card, adiciona 1 ao índice
    if(sourceColumnID !== activeColumnID && destinationIndex === (cardsInActiveColumn.length - 1)){
        destinationIndex++;
    }
    //qualquer índice de card maior que 1 é subtraído 1.
    if(destinationIndex > 1) destinationIndex--;
}
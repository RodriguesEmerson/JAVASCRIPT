import { domDynamicList } from "./modules/DOM.js";
import { api, saveApiInLocalStorange } from "./main.js";


let dDom = domDynamicList();
// //Verifica se houve mudanças no DOM e, se sim, executa o codigo
// const observer = new MutationObserver(function(){ addEvents() });
// const setting = {childList: true, subtree: true};
// observer.observe(dom.board, setting);

/**==================================================================================================================================
 *                                                              Drang and Drop                                                      *
 ===================================================================================================================================*/
let [tempDiv, 
    selectedCard, 
    activeColumnID, 
    sourceColumn,
    destinationIndex,
    dragCardID,
] = [null];
let sourceColumnSaved = false;

//================================================================================
//================================================================================
function dragStart(){
    
    //cria a div temporária
    tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'tempDiv');
    tempDiv.style.height = `${this.offsetHeight}px`;

    this.classList.add('dragging');
    selectedCard = this;

    getCardInformations(this);
}

//================================================================================
//================================================================================
function dragOver(cardEvent){

    selectedCard.classList.add('hidden');

    //Atualiza a coluna ativada e salva a coluna de origem
    activeColumnID = this.closest('.list').id;
    if(!sourceColumnSaved){ 
        sourceColumnSaved = true;
    } 

    //pega a posição do card que esta abaixo do card arratado
    const CardNewPosition = getNewPosition(this, cardEvent.clientY);

    //Coloca a tempDiv no luga do card que está abaixo dele.
    if(CardNewPosition){
        CardNewPosition.insertAdjacentElement('afterend', tempDiv);
    }else{
        this.prepend(tempDiv)
    }
}

//================================================================================
//================================================================================
function dragEnd(){

    destinationDragCardIndex();

    //Atualiza os atributos do card arrastado
    this.classList.remove('dragging');
    this.classList.remove('hidden');

    //Substitui a div temporária pelo card arrastado
    const deleteTemDiv = document.querySelector('.tempDiv');
    if(deleteTemDiv){
        deleteTemDiv.parentNode.replaceChild(this, deleteTemDiv);
    }
    updateAPI();
} 

//================================================================================
//================================================================================
                //Durante todo o processo do dragover esta função é chamada.
                //Ela verifica se o card arrastado esta acima de algum card.
                //Se estiver acima da metade do card, essa posição é retornada
                //para a variável 'CardNewPosition'.
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

//================================================================================
//================================================================================
function updateAPI(){
    try{
    //Guarda todos os dados do card que está sendo arrastado
    let dragCard, dragCardOriginIdex;
    api.columns[sourceColumn].cards.forEach((card, index) => {
        if (card.id === dragCardID) {                    
            dragCard = card;
            dragCardOriginIdex = index;
        }
    });

    //Apaga o card da coluna de origem
    api.columns[sourceColumn].cards.splice(dragCardOriginIdex, 1);

    //Encontra a coluna ativa na 'api'
    let  activeColumn;
    for (let column in api.columns){ 
        if(api.columns[column].id == activeColumnID){
        activeColumn = (api.columns[column]);
        };
    }

    //Salva o card arrastado na coluna da 'api' respectiva a coluna ativa
    activeColumn.cards.splice(destinationIndex, 0, dragCard)

    }catch(err){
        console.log(err)
    }   

    sourceColumnSaved = false;
    saveApiInLocalStorange();
}

//================================================================================
//================================================================================
export function getCardInformations(card){

    //Guarda o id e o nome da coluna de origem do card arratado
    const sourceColumnID = card.closest('.list').id;
    const cardId = card.querySelector('.list-square').id;
        dragCardID = cardId;
    let columnName = document.querySelector(`#${sourceColumnID} .list-title`);
        columnName = columnName.textContent;
    sourceColumn = columnName.replace(' ', '_');

    return {
        cardId,
        sourceColumn,
        sourceColumnID
    }
}

//================================================================================
//================================================================================
        //Esta funão salva o índice em que o card é solto
        //para inserir o objt com os dados do card na mesta ordem
        //na 'api'.
function destinationDragCardIndex(){

    //seleciona todos os cards da coluna ativa, inclusive a tempDiv.
    const cardsInActiveColumn = document.querySelectorAll(`#${activeColumnID} .drag-area > div:not(.dragging)`);

    //Encontra o índice da tempDiv.
    for(let i = 0; i < cardsInActiveColumn.length; i++){
        if(cardsInActiveColumn[i].classList.contains('tempDiv')){
            destinationIndex =  i;
            break;
        }
    }
}

//================================================================================
//================================================================================
export function addEvents(){
    
    dDom = domDynamicList();
    dDom.columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
    });
    dDom.cards.forEach(card => {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    })
}

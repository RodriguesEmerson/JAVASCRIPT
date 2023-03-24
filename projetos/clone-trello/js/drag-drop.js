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
    sourceColumnID,
    sourceColumn,
    destinationIndex,
    sourceCardID,
] = [null];
let sourceColumnSaved = false;

//================================================================================
//================================================================================
function dragStart(){
    
    //cria a div temporária
    tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'tempDiv');
    tempDiv.style.height = `${this.offsetHeight}px`;

    //salva o card arratado na variável selectedCard
    this.classList.add('dragging');
    selectedCard = this;
}

//================================================================================
//================================================================================
function dragOver(cardEvent){

    selectedCard.style.display = 'none';

    //Atualiza a coluna ativada e salva a coluna de origem
    activeColumnID = this.closest('.list').id;
    if(!sourceColumnSaved){ 
        sourceColumnID = activeColumnID; 
        saveCardInformations(selectedCard);
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

    //Atualiza os atributos do card arrastado
    this.classList.remove('dragging');
    this.style.display = 'flex';
    const deleteTemDiv = document.querySelector('.tempDiv');

    saveDestinationIndex();

    //Substitui a div temporária pelo card arrastado
    if(deleteTemDiv){
        deleteTemDiv.parentNode.replaceChild(this, deleteTemDiv);
    }
    atualizaApi();
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
function atualizaApi(){
    try{
        //Salva todos os dados do card que está sendo arrastado
        let dragCard, originIndexCard;
        api.columns[sourceColumn].cards.forEach((card, index) => {
            if (card.id === sourceCardID) {                    
                dragCard = card;
                originIndexCard = index;
            }
        });

        //Apaga o card da coluna de origem
        api.columns[sourceColumn].cards.splice(originIndexCard, 1);
   
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
function saveCardInformations(dragCard){

    //Guarda o id e o nome da coluna de origem do card arratado
    const cardId = dragCard.querySelector('.list-square').id;
        sourceCardID = cardId;
    let columnName = document.querySelector(`#${sourceColumnID} .list-title`);
        columnName = columnName.textContent;
    sourceColumn = columnName.replace(' ', '_');
}

//================================================================================
//================================================================================
        //Esta funão salva o índice em que o card é solto
        //para inserir o objt com os dados do card na mesta ordem
        //na 'api'.
function saveDestinationIndex(){

    //seleciona todos os cards da coluna ativa, inclusive a tempDiv.
    const cardsInActiveColumn = document.querySelectorAll(`#${activeColumnID} .drag-area > div`);

    //Encontra o índice da tempDiv.
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

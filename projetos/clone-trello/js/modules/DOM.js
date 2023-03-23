/**=================================================================================
 *            Elementos que precisam ser selecionados mais de uma vez              *
 ==================================================================================*/
export function domDynamicList(){
    const board = document.querySelector('.board')
    let showAddCard = document.querySelectorAll('.show-add-card');
    let newCardText = document.querySelectorAll('.add-card-text');
    let newCardBtn = document.querySelectorAll('.add-card-button');
    let closeAddCard = document.querySelectorAll('.close-add-card');
    let optionsAddCard = document.querySelectorAll('.options-add-card');
    let cards = document.querySelectorAll('.list-content');
    let columns = document.querySelectorAll('.drag-area');

    return{
        board,
        showAddCard,
        newCardText,
        newCardBtn,
        closeAddCard,
        optionsAddCard,
        cards, 
        columns,
    }
    
}

//Elementos da coluna ativa duranto o dragover
export function column(parent){
    const activeAddNewCardBox = document.querySelector(`#${parent} .add-card`);
    const hiddenButtonAddNewCard = document.querySelector(`#${parent} .show-add-card`);
    const activeTextArea = document.querySelector(`#${parent} add-card-text`);

    return { activeAddNewCardBox, 
             hiddenButtonAddNewCard, 
             activeTextArea 
           }

}


/**=================================================================================
 *                 Elementos que serão selecionados apenas uma vez                 *
 ==================================================================================*/
const boxCardOptions = document.querySelector('.box-cards-options');
const btnCloseCardOptions = document.querySelector('.box-cards-options .close-options');
const moreCardOptions = document.querySelectorAll('.option-item');
const boxTags = document.querySelector('.box-tags');
const btnBackBoxCardOptions = document.querySelector('.back-to-options');
const btnCloseBoxTags = document.querySelector('.box-tags .close-options');
const searchTags = document.querySelector('.search-tags')


export const domStaticList = {
    boxCardOptions,
    btnCloseCardOptions,
    moreCardOptions,
    boxTags,
    btnBackBoxCardOptions,
    btnCloseBoxTags,
    searchTags
}
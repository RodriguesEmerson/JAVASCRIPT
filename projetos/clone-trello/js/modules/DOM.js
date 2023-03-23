/**==================================================================================================================================
 *                                     Elementos que precisam ser selecionados mais de uma vez                                      *
 ===================================================================================================================================*/
 //Elementos das colunas e cards
export function domDynamicList(){
    let showAddCard = document.querySelectorAll('.show-add-card');
    let newCardText = document.querySelectorAll('.add-card-text');
    let newCardBtn = document.querySelectorAll('.add-card-button');
    let closeAddCard = document.querySelectorAll('.close-add-card');
    let optionsAddCard = document.querySelectorAll('.options-add-card');
    let cards = document.querySelectorAll('.list-content');
    let columns = document.querySelectorAll('.drag-area');

    return{
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
export function domActiveColumn(parent){
    const newCardBox = document.querySelector(`#${parent} .add-card`);
    const previaCard = document.querySelector(`#${parent} .previa-card`)
    const btnShowNewCardBox = document.querySelector(`#${parent} .show-add-card`);
    const newCardText = document.querySelector(`#${parent} .add-card-text`);

    return { newCardBox, 
             previaCard,
             btnShowNewCardBox, 
             newCardText 
           }

}

//Elementos da box de Etiquetas
export function domTagsBox(){
    const tagCheckBox = document.querySelectorAll('.checkbox-label');
    const tagPreColor = document.querySelectorAll('.tag-color');
    const btnTagEdit = document.querySelectorAll('.edit-tag');

    return {
        tagCheckBox,
        tagPreColor,
        btnTagEdit,
    }
}


/**==================================================================================================================================
 *                                           Elementos que serão selecionados apenas uma vez                                        *
 ===================================================================================================================================*/
const board = document.querySelector('.board');
const boxCardOptions = document.querySelector('.box-cards-options');
const btnCloseCardOptions = document.querySelector('.box-cards-options .close-options');
const moreCardOptions = document.querySelectorAll('.option-item');
const boxTags = document.querySelector('.box-tags');
const tagsList = document.querySelector('.tags-list')
const btnBackBoxCardOptions = document.querySelector('.back-to-options');
const btnCloseBoxTags = document.querySelector('.box-tags .close-options');
const searchTags = document.querySelector('.search-tags')


export const domStaticList = {
    board,
    boxCardOptions,
    btnCloseCardOptions,
    moreCardOptions,
    boxTags,
    tagsList,
    btnBackBoxCardOptions,
    btnCloseBoxTags,
    searchTags
}
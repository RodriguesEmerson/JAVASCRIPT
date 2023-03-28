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
    let btnEditCards = document.querySelectorAll('.edit-card')
    let cards = document.querySelectorAll('.list-content');
    let columns = document.querySelectorAll('.drag-area');

    return{
        showAddCard,
        newCardText,
        newCardBtn,
        closeAddCard,
        optionsAddCard,
        btnEditCards,
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
    const fakeCheckboxTag = document.querySelectorAll('.checkbox-label');
    const checkboxTag = document.querySelectorAll('.tag-checkbox')
    const tagPreColor = document.querySelectorAll('.tag-color');
    const btnTagEdit = document.querySelectorAll('.edit-tag');

    return {
        fakeCheckboxTag,
        checkboxTag,
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

const boxEditCard = document.querySelector('#box-edit-card')
const editCardContainer = document.querySelector('#box-edit-card_container');
const editCardThumb = document.querySelector('#box-edit-card_thumb');
const editCardPreTags = document.querySelector('#box-edit-card_previa-tags');
const editCardText = document.querySelector('#box-edit-card_card-content_text');
const btnSaveEditedCard = document.querySelector('#save-edited-card');
const editBoxCardOptions = document.querySelector('#box-edit-card_options');
const boxEditCardOptions = document.querySelectorAll('.type-option');


export const domStaticList = {
    board,
    boxCardOptions,
    btnCloseCardOptions,
    moreCardOptions,
    boxTags,
    tagsList,
    btnBackBoxCardOptions,
    btnCloseBoxTags,
    searchTags,

    boxEditCard,
    editCardContainer,
    editCardThumb,
    editCardPreTags,
    editCardText,
    btnSaveEditedCard,
    editBoxCardOptions,
    boxEditCardOptions
}
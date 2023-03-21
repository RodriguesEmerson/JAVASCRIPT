export function domList(){
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


export function column(parent){
    
    const activeAddNewCardBox = document.querySelector(`#${parent} .add-card`);
    const hiddenButtonAddNewCard = document.querySelector(`#${parent} .show-add-card`);
    const activeTextArea = document.querySelector(`#${parent} add-card-text`);

    return { activeAddNewCardBox, 
             hiddenButtonAddNewCard, 
             activeTextArea 
           }

}


























// const hShowOptions = document.querySelector('.header-clicked_box');
// const h_btnOptions = document.querySelectorAll('.op-menu')

// for (let i = 0; i < h_btnOptions.length; i++){
//     h_btnOptions[i].addEventListener('click', () => {

//         let clikedElement = h_btnOptions[i].id
//         let elementPosition = h_btnOptions[i].offsetLeft
        
//         hShowOptions.style.left = `${elementPosition}px`
//         showMenuOptions[clikedElement]();

//     })
// }

// const showMenuOptions = {

//     header_work_space(){
//         drop.alert()
//     },

//     header_recent(){
  
//     },

//     header_starred(){
        
//     },

//     header_model(){
        
//     }
// }




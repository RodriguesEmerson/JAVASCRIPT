const hShowOptions = document.querySelector('.header-clicked_box');
const h_btnOptions = document.querySelectorAll('.op-menu')

for (let i = 0; i < h_btnOptions.length; i++){
    h_btnOptions[i].addEventListener('click', () => {

        let clikedElement = h_btnOptions[i].id
        let elementPosition = h_btnOptions[i].offsetLeft
        
        hShowOptions.style.left = `${elementPosition}px`
        showMenuOptions[clikedElement]();

    })
}





import dom from "./modules/DOM.js"

function showAddCardDiv(){
    const parentList = this.closest('.list').id;
    const addCardDiv = document.querySelector(`#${parentList} .add-card`);
    
    addCardDiv.classList.remove('hiden')
    this.classList.add('hiden')
}

dom.showAddCard.forEach(button =>{
    button.addEventListener('click', showAddCardDiv);
})

















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
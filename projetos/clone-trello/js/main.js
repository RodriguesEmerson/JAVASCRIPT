

const hShowOptions = document.querySelector('.header-clicked_box');
const h_btnOptions = document.querySelectorAll('.op-menu')



import { dropAndDrad } from './modules/drag-drop.js';
// const drop = dropAndDrad;


for (let i = 0; i < h_btnOptions.length; i++){
    h_btnOptions[i].addEventListener('click', () => {

        let clikedElement = h_btnOptions[i].id
        let elementPosition = h_btnOptions[i].offsetLeft
        
        hShowOptions.style.left = `${elementPosition}px`
        showMenuOptions[clikedElement]();

    })
}


























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
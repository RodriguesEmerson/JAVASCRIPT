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

const showMenuOptions = {

    header_work_space(){
        
    },

    header_recent(){
  
    },

    header_starred(){
        
    },

    header_model(){
        
    }
}

let listItem, column, tempDiv;
(function selector(){
    listItem = document.querySelectorAll('.list-content');
    column = document.querySelectorAll('.drag-area');
})();


let elementMoving;
for ( let i = 0; i < listItem.length; i++ ){

    /**=============DragStart================ */
    listItem[i].addEventListener('dragstart', () => {

        tempDiv = document.createElement('div')
        tempDiv.setAttribute('class', 'tempDiv')

        listItem[i].classList.add('dragging')
    })

    /**=============DragStart================ */
    listItem[i].addEventListener('dragend', () => {

        listItem[i].classList.remove('dragging')
        listItem[i].style.display = 'flex'

        let tempDIV = document.querySelector('.tempDiv')
        tempDIV.parentNode.replaceChild(elementMoving, tempDIV) //substitui a div temporaria 'sombra'.
            
        
    })
}

column.forEach( item => {
    item.addEventListener('dragover', ( element => {
        
        let dragging = document.querySelector('.dragging');
        dragging.style.display = 'none';

        elementMoving = dragging;

        let applayAfter = getNewPosition(item, element.clientY);
       
        if( applayAfter ){
            applayAfter.insertAdjacentElement('afterend', tempDiv);
        }else{
            item.prepend(tempDiv);
        }
    }));

   
})


function getNewPosition( column, positionY ){
    const cards = column.querySelectorAll('.list-content:not(.dragging');
    let result;

    for (let refer_card of cards){
        
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if( positionY >= boxCenterY ) result = refer_card;
    }
    return result;
}

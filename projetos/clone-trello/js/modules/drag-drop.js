
let listItem, column;
(function selector(){
    listItem = document.querySelectorAll('.list-content');
    column = document.querySelectorAll('.list');
})();

for (let i = 0; i < listItem.length; i++){
    listItem[i].addEventListener('dragstart', () => {
        listItem[i].classList.add('dragging')
    })

    listItem[i].addEventListener('dragend', () => {
        listItem[i].classList.remove('dragging')
    })
}

column.forEach( item => {
    item.addEventListener('dragover', (element => {
        let dragging = document.querySelector('.dragging');
        let applayAfter = getNewPosition (item, element.clientY);

        if( applayAfter ){
            applayAfter.insertAdjacentElement('afterend', dragging);
        }else{
            item.prepend(dragging);
        }
    }));

   
})


function getNewPosition( column, positionY ){
    const cards = column.querySelectorAll('.item:not(.dragging');
    let result;

    for (let refer_card of cards){
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if( positionY >= boxCenterY )result = refer_card;
    }
    return result;
}

export const dropAndDrad = {
    alert(){
        alert('foi')
    }
}
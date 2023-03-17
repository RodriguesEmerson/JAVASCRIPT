let listItem, column, tempBack, tempDiv, tempContet;
(function selector() {
    listItem = document.querySelectorAll('.list-content');
    column = document.querySelectorAll('.drag-area');
})();
const board = document.querySelector('.board')

tempBack = document.createElement('div')
tempBack.setAttribute('class', 'tempBack')

tempDiv = document.createElement('div')
tempDiv.setAttribute('class', 'tempDiv')



let positionMouseClicked_X, positionMouseClicked_Y;
listItem[0].addEventListener('dragstart', (element) => {
    
    listItem[0].classList.add('dragging')

    let elementPosition = listItem[0].getBoundingClientRect();
    positionMouseClicked_X = Math.abs(elementPosition.left - element.clientX)
    positionMouseClicked_Y = Math.abs(elementPosition.top - element.clientY)
    
})
listItem[0].addEventListener('dragover', (element) => {

    let itemHeight = listItem[0].offsetHeight;
    column[0].appendChild(tempBack)

    tempDiv.style.height = `${itemHeight}px`
    tempDiv.innerHTML = listItem[0].innerHTML
   // board.appendChild(tempDiv)
    
   
    listItem[0].style.position = 'absolute'
    listItem[0].style.left = (element.clientX - positionMouseClicked_X) + 'px'
    listItem[0].style.top = (element.clientY - positionMouseClicked_Y) + 'px'

    
    //console.log('Left: ' + (element.clientX - positionMouseClicked_X) + 'px')
    // console.log('Position Atual: ' + element.clientX)

})

listItem[0].addEventListener('dragend', (element) => {

    let dragging = document.querySelector('.dragging');
    dragging.style = ''

    
    column[0].removeChild(tempBack)

    column[0].prepend(dragging)
    dragging.classList.remove('dragging')

    


})




















/**=====NÃO GOSTEI DESSE RESULTADO===== */
/*
let listItem, column;
(function selector(){
    listItem = document.querySelectorAll('.list-content');
    column = document.querySelectorAll('.drag-area');
})();

for ( let i = 0; i < listItem.length; i++ ){
    listItem[i].addEventListener('dragstart', () => {
        listItem[i].classList.add('dragging')
    })

    listItem[i].addEventListener('dragend', () => {
        listItem[i].classList.remove('dragging')
    })
}

column.forEach( item => {
    item.addEventListener('dragover', ( element => {
        
        let dragging = document.querySelector('.dragging');
        let applayAfter = getNewPosition(item, element.clientY);
       
        if( applayAfter ){
            applayAfter.insertAdjacentElement('afterend', dragging);
        }else{
            item.prepend(dragging);
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
*/
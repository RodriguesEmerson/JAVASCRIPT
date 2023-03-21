import { domList, column } from "./modules/DOM.js"
import  api  from "./modules/pre-API.js"

let dom = domList();

//===========================================================================
/**Isso seria mais fácil e mais seguro com React */
function buildColums(objColumn){

    const newColumn = document.createElement('div');
    newColumn.setAttribute('class', 'list');
    newColumn.setAttribute('id', `${objColumn.id}`);

    newColumn.innerHTML = `<span class="list-title">${objColumn.title}</span>
                            <div class="drag-area">
                            </div>
                            <div class="list-add-item">
                                <div class="show-add-card">
                                    <span class="material-symbols-outlined">
                                        add
                                    </span>
                                    <span>Adicionar um cartão</span>
                                </div>
                                <div class="add-card hiden">
                                    <textarea class="add-card-text" cols="32" 
                                    rows="5" placeholder="Insira um texto"></textarea>
                                    <div class="box-button-more">
                                        <div>
                                            <button class="add-card-button">Adicionar</button>
                                            <span class="material-symbols-outlined close-add-card">
                                                close
                                            </span>
                                        </div>
                                        <span class="material-symbols-outlined options-add-card">
                                            more_horiz
                                        </span>
                                    </div>
                                </div>
                            </div>`

     dom.board.appendChild(newColumn);
    buildCards(newColumn, objColumn)
}

function buildCards(column, objColumn){

    let cardsArea = column.querySelector('.drag-area')

    objColumn.cards.forEach(card => {
        const newCard = document.createElement('div');
        newCard.setAttribute('class', 'list-content');
        newCard.draggable = true;

        const cardTags = buildTags(card.tags);
        newCard.innerHTML = `<div class="list-square" id="${card.id}">
                                <span>${card.text}</span>
                            </div>`
                            
        const listSquare = newCard.querySelector('.list-square');
        listSquare.prepend(cardTags);
        cardsArea.appendChild(newCard);

        function buildTags(tags){ 
            if(!tags) return null;
            const newTags = document.createElement('div');
            newTags.setAttribute('class', 'tags')

            tags.forEach(tag => {
                const newTag = document.createElement('span');
                newTag.setAttribute('class', 'tag');
                newTag.style.backgroundColor = tag;
                newTags.appendChild(newTag);
            })
            return newTags;
        }
    })
}

//===========================================================================
for (const column in api){
    buildColums(api[column])
}

domList();
dom = domList();

let openAddNewCard = false;
let [activeColumn, columnItems] = [null];
function showAddCardDiv(){
    //Se houver outra AddCard aberto, o fecha.
    if(openAddNewCard) closeAddCardDiv();

    activeColumn = this.closest('.list').id;
    columnItems = column(activeColumn);

    columnItems.activeAddNewCardBox.classList.remove('hiden');
    this.classList.add('hiden');

    openAddNewCard = true;
};

function closeAddCardDiv(){
    columnItems.activeAddNewCardBox.classList.add('hiden')
    columnItems.hiddenButtonAddNewCard.classList.remove('hiden')
    openAddNewCard = false;
};

dom.showAddCard.forEach(button =>{
    button.addEventListener('click', showAddCardDiv);
});
dom.closeAddCard.forEach(button => {
    button.addEventListener('click', closeAddCardDiv)
});




//=========================add new card functions ==============================
dom.newCardBtn.forEach(button => {
    button.addEventListener('click', createNewCard)
})

function createNewCard(){
    const fatherColumn = this.closest('.list').id;
    const newCardText = document.querySelector(`#${fatherColumn} .add-card-text`);

    //column to insert the data
    let  columnInsert = function(){
        for (let column in api){
            if(api[column].id == fatherColumn){
                return api[column]
            };
            
        }
    }
    columnInsert = columnInsert();
    console.log(newCardText.value);
    // if(newCardText.value === "") return;

   




}



// function findFatherColumn(clickedButton){
//      const fatherColumn = clickedButton.closest('.list').id;
//      return fatherColumn;
// }
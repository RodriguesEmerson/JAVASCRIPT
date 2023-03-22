import { domList, column } from "./modules/DOM.js"
import  api  from "./modules/pre-API.js"

let dom = domList();

const observer = new MutationObserver(function(){ addEvents() });
const setting = {childList: true};
observer.observe(dom.board, setting);

//===============================Build Columns and Cards=====================================
/**Isso seria mais fácil e mais seguro com React */
function buildColums(apiColumn){

    const newColumn = document.createElement('div');
    newColumn.setAttribute('class', 'list');
    newColumn.setAttribute('id', `${apiColumn.id}`);

    newColumn.innerHTML = `<span class="list-title">${apiColumn.title}</span>
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
    buildCards(newColumn, apiColumn)
}


function buildCards(column, apiColumn){

    let cardsArea = column.querySelector('.drag-area')

    apiColumn.cards.forEach(card => {
        const newCard = document.createElement('div');
        newCard.setAttribute('class', 'list-content');
        newCard.draggable = true;

        const cardTags = buildTags(card.tags);
        newCard.innerHTML = `<div class="list-square" id="${card.id}">
                                <span>${card.text}</span>
                            </div>`
                            
        const listSquare = newCard.querySelector('.list-square');
        if(cardTags.innerHTML){ listSquare.prepend(cardTags) };
        cardsArea.appendChild(newCard);

        function buildTags(tags){ 
            if(!tags) return;
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


//=========================add new card functions ==============================
let tempTags =[ 'blue', 'red', 'green']
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

    columnInsert = columnInsert().cards;
    if(newCardText.value === "") return;

    //crete a new card object
    const card = {
        id: `ftr${fatherColumn}card${radomId()}`,
        tags: tempTags,
        text: newCardText.value,
    }
    columnInsert.push(card)
    newCardText.value = "";
    
    //Atualiza a tela
    dom.board.innerHTML = '';
    for (const column in api){
        buildColums(api[column])
    }
    
}

function radomId(){
    const min = Math.ceil(0);
    const max = Math.floor(10000);
    return Math.floor(Math.random() * (max - min) - min)
}



//===============================Events============================================
//chama a função para criar cada coluna 
for (const column in api){
    buildColums(api[column])
}



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

function addEvents(){
    //Atualiza a seleção DOM
    dom = domList();

    dom.showAddCard.forEach(button =>{
        button.addEventListener('click', showAddCardDiv);
    });
    
    dom.closeAddCard.forEach(button => {
        button.addEventListener('click', closeAddCardDiv)
    });
    
    dom.newCardBtn.forEach(button => {
        button.addEventListener('click', createNewCard)
    })
}
addEvents();
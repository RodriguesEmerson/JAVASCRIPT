
import { domList, column } from "./modules/DOM.js"
import  api  from "./modules/pre-API.js"


let dom = domList();


//===========================================================================

/**Isso seria mais fácil e mais seguro com React */
function buildColums(column){

    const newColumn = document.createElement('div');
    newColumn.setAttribute('class', 'list');
    newColumn.setAttribute('id', `${column.id}`);

    newColumn.innerHTML = `<span class="list-title">${column.title}</span>
                            <div class="drag-area">
                                <div class="list-content" draggable="true">
                                    <div class="list-square">
                                        <span>${column.text}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="list-add-item">
                                <div class="show-add-card">
                                    <span class="material-symbols-outlined">
                                        add
                                    </span>
                                    <span>Adicionar um cartão</span>
                                </div>
                                <div class="add-card hiden">
                                    <textarea class="add-card-text" cols="32" rows="5" placeholder="Insira um texto"></textarea>
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
    

}

//===========================================================================
for (const column in api){

    buildColums(api[column])
}
domList();
dom = domList();


let [activeColumn, columnItems] = [null];

function showAddCardDiv(){
    activeColumn = this.closest('.list').id;
    columnItems = column(activeColumn);

    columnItems.activeAddNewCardBox.classList.remove('hiden');
    this.classList.add('hiden')
}

function closeAddCardDiv(){
    columnItems.activeAddNewCardBox.classList.add('hiden')
    columnItems.hiddenButtonAddNewCard.classList.remove('hiden')
}

dom.showAddCard.forEach(button =>{
    button.addEventListener('click', showAddCardDiv);
})
dom.closeAddCard.forEach(button => {
    button.addEventListener('click', closeAddCardDiv)
})









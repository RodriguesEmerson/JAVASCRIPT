/**==================================================================================================================================
 *                                               Funções que carregam os cards na tela                                              *
 ===================================================================================================================================*/
 import { domStaticList,} from "./DOM.js";
 const sDom = domStaticList;
 import { api, addEvents } from "../main.js";

//estre grupo de funões são chamados apenas quando o browser é recarreado. Elas
//pegam os dados do obj 'api' e os carregam na tela.
function buildColums(apiColumn){

    const newColumn = document.createElement('div');
    newColumn.setAttribute('class', 'list');
    newColumn.setAttribute('id', `${apiColumn.id}`);

    newColumn.innerHTML = `<span class="list-title">${apiColumn.title}</span>
                            <div class="drag-area">
                            <!--Card aqui-->
                            </div>
                            <div class="list-add-item">
                                <div class="show-add-card">
                                    <span class="material-symbols-outlined">
                                        add
                                    </span>
                                    <span>Adicionar um cartão</span>
                                </div>
                                <div class="add-card hidden">
                                    <div class="previa-card">
                                        <!--previa das tags-->
                                        <textarea class="add-card-text" cols="32" 
                                        rows="1" placeholder="Insira um texto"></textarea>
                                    </div>
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

        sDom.board.appendChild(newColumn);
    buildCards(newColumn, apiColumn);
}

//================================================================================
//================================================================================
                //Quando uma coluna é gerada, esta função é chamada
                //e cria todos os cards da respectiva coluna
function buildCards(column, apiColumn){
// console.log(api)
    let cardsArea = column.querySelector('.drag-area')
    apiColumn.cards.forEach(card => {
        const newCard = document.createElement('div');
        newCard.setAttribute('class', 'list-content');
        newCard.draggable = true;
        const cardTags = buildTags(card.tags);
        newCard.innerHTML = `<span class="material-symbols-outlined 
                                edit-card"> edit </span>
                                <div class="list-square" id="${card.id}">
                                    <span class="card-text">${card.text}</span>
                                </div>`
                            
        const listSquare = newCard.querySelector('.list-square');
        if(cardTags.innerHTML){ listSquare.prepend(cardTags) };
        cardsArea.appendChild(newCard);
    })
}


//================================================================================
//================================================================================
                //Quando cada card é criado, esta função é chamada
                //e cria todas as tags do repctivo card            
export function buildTags(tags){ 
    //carrega as tags para serem mostradas na tela
    if(!tags) return;
    const newTags = document.createElement('div');
    newTags.setAttribute('class', 'tags')
    
    for (let key in tags){
        const newTag = document.createElement('span');
        newTag.setAttribute('class', 'tag');
        newTag.classList.add(`${tags[key].id}`);
        newTag.style.backgroundColor = tags[key].color;
        newTags.appendChild(newTag);
    }
        
    return newTags;
}

//================================================================================
//================================================================================
//chama a função para carregar os dados na tela 
export function loadCards(){
    for (const column in api.columns){
        buildColums(api.columns[column])
    }
    
}

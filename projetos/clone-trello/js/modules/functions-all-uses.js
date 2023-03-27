import { 
    domTagsBox,
    domStaticList
} from "./DOM.js";

const sDom = domStaticList;

import { api, activeNewCardBox, tempTags, editingMode } from "../main.js";


//================================================================================
//================================================================================
//cria a tag quando uma nova tag é clicada
let divPrevTagCreated = false;
let  acitiveDiv;
function addTags(clickedTag){
    let tbDom = domTagsBox();
    
    let classe;
    
    //Cria ou seleciona a div de tags do card que está sendo criado
    if(!editingMode){
        if(!divPrevTagCreated){
            acitiveDiv = document.createElement('div');
            acitiveDiv.setAttribute('class', 'previa-tags');
            activeNewCardBox.previaCard.prepend(acitiveDiv);
            classe = 'tag';
            divPrevTagCreated = true;
        }else{
            acitiveDiv = activeNewCardBox.previaCard.querySelector('.previa-tags');
            classe = 'tag';
        }
    }
    
    //Se o card estiver sendo editado, seleciona a div de edição de tags
    if(editingMode){
        classe = 'editing-tag';
        acitiveDiv = sDom.editCardPreTags;
    }
    
    const tag = api.tagsOptions[clickedTag];
    if(tbDom.checkboxTag[clickedTag].checked) return removeTags(tag);
    
    //cria a tag na tempTags
    const newObjTag = {
        color: tag.color,
        id: tag.id
    }
    tempTags.push(newObjTag)

    //cria a tag na tela
    const previaTagSpan = document.createElement('span');
            previaTagSpan.setAttribute('class', classe);
            previaTagSpan.id  = `${tag.id}`
            previaTagSpan.style.backgroundColor = tag.color;  

    acitiveDiv.appendChild(previaTagSpan);
}

//================================================================================
//================================================================================
            //Remove tags tanto do card na tela quanto da tempTags
function removeTags(tag){
    console.log(acitiveDiv)
    const cardCont = acitiveDiv;
    const tagTempToRemove = tempTags.findIndex(obj => obj.id == tag.id);
    tempTags.splice(tagTempToRemove, 1)

    const tagSpanToRemove = cardCont.querySelector(`#${tag.id}`);
    cardCont.removeChild(tagSpanToRemove)

}

export { addTags, removeTags};
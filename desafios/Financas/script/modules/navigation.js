import { carregaTabelas } from "../script.js";
const checboxAno = document.querySelectorAll('input[type=checkbox]');
const liMeses = document.querySelectorAll('.link-mes');
let anoAnteriorSelecionado;
let anoAtivo;
let ano = 2024;
let mes = 'JAN';
export {ano, mes}

const navClick = {
    mesAnteriorSelecionado: '',
    mesAtualSelecionado: '',
    anoClicadoID: '',
    mesClicadoValue: '',
    selecionaAnoMesClicado: function(li){
        this.mesAtualSelecionado = li;
        this.mesClicadoValue = li.getAttribute('value');
        this.anoClicadoID = li.closest('ul')
            .getAttribute('id')
            .substring(1);
        this.mudaCores();
        console.log('Ano:' + this.anoClicadoID);
        console.log('Mes:' + this.mesClicadoValue);
    },

    //mudar a cor do mês e do ano através do mês clicado.
    mudaCores: function(){
        const anoAtualSelecionado = document.querySelector(`#A${this.anoClicadoID} .link-ano`);
        this.mesAtualSelecionado.style.color = 'white';
        if(this.mesAnteriorSelecionado){
            if(this.mesAnteriorSelecionado == this.mesAtualSelecionado) return
            this.mesAnteriorSelecionado.style.color = 'gray';
        }
        anoAnteriorSelecionado.style.color = 'gray';
        anoAtualSelecionado.style.color = 'white';

        this.mesAnteriorSelecionado = this.mesAtualSelecionado;
        anoAnteriorSelecionado = anoAtualSelecionado;
        this.mudarMesTabelas();
    },

    mudarMesTabelas: function(){
        const tabelas = ['despesas', 'receitas', 'fixos']
        ano = this.anoClicadoID;
        mes = this.mesClicadoValue;
        tabelas.forEach(element =>{
            carregaTabelas.insereDados(element);
        });
    }
     
}

function abirFecharNavAno(){
    const ulPai = this.closest('ul');
    const ulPaiID = this.closest('ul').getAttribute('id');
    const sinalAbrirFechar = document.querySelector(`#${ulPaiID} .sinal-abir-fechar`);

    if(this.checked){
        sinalAbrirFechar.textContent = '-';
        ulPai.style.height = 'auto';
    }else{
        sinalAbrirFechar.textContent = '+';
        ulPai.style.height = '20px';
    }
    
    //Mudar cor do ano clicado;
    const anoAtualSelecionado = document.querySelector(`#${ulPaiID} .link-ano`);
    if(sinalAbrirFechar.textContent == '-'){
        anoAtualSelecionado.style.color = 'white';
    }
    if(anoAnteriorSelecionado){
        anoAnteriorSelecionado.style.color = 'gray';
        if(anoAnteriorSelecionado == anoAtualSelecionado){
            anoAnteriorSelecionado.style.color = 'white';
            if(sinalAbrirFechar.textContent == '+'){
                anoAnteriorSelecionado.style.color = 'gray';
            }
        } 
    }
    anoAnteriorSelecionado = anoAtualSelecionado;
};

(function(){
    for(let ind = 0; ind < checboxAno.length; ind++){
        checboxAno[ind].addEventListener('change', abirFecharNavAno);
    }
    for(let ind = 0; ind < liMeses.length; ind++){
        liMeses[ind].addEventListener('click', navClick.selecionaAnoMesClicado.bind(navClick, liMeses[ind]))
    }
}());
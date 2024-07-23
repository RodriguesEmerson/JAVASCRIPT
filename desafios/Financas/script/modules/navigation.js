const checboxAno = document.querySelectorAll('input[type=checkbox]');
const liMeses = document.querySelectorAll('.link-mes');
let liAnteriorClicada;

const MudarMesTabela = {
    ulDoAnoClicado: '',
    liDoMesClicado:'',
    anoClicado: '',
    mesClicado: '',
    selecionaAnoMesClicado: function(li){
        this.liDoMesClicado = li;
        this.ulDoAnoClicado = li.closest('ul');
        this.mesClicado = li.getAttribute('value');
        this.anoClicado = li.closest('ul')
            .getAttribute('id')
            .substring(1);
        this.mudaCores();
        },
        mudaCores: function(){
            this.liDoMesClicado.style.color = 'white';
        },
     
}

function openCloseYearNav(){
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
    const liDoAnoClicado = document.querySelector(`#${ulPaiID} .link-ano`);
    if(sinalAbrirFechar.textContent == '-'){
        liDoAnoClicado.style.color = 'white';
    }
    if(liAnteriorClicada){
        liAnteriorClicada.style.color = 'gray';
    }
    liAnteriorClicada = liDoAnoClicado;
    
    

};

(function(){
    for(let ind = 0; ind < checboxAno.length; ind++){
        checboxAno[ind].addEventListener('change', openCloseYearNav);
    }
    for(let ind = 0; ind < liMeses.length; ind++){
        liMeses[ind].addEventListener('click', MudarMesTabela.selecionaAnoMesClicado.bind(MudarMesTabela, liMeses[ind]))
    }
}());
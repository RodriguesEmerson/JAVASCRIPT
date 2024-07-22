const checboxAno = document.querySelectorAll('input[type=checkbox]');
const liMeses = document.querySelectorAll('.link-mes');
let anoClicado = 1;
let mesClicado;

const MudarMesTabela = {
    anoClicado: '',
    mesClicado: '',
    selecionaAnoMesClicado: function(){
        this.mesClicado = this.getAttribute('value');
        this.anoClicado = this.closest('ul')
            .getAttribute('id')
            .substring(1);
     },
     
}
function openCloseYearNav(){
    const ulPai = this.closest('ul');
    const ulPaiID = this.closest('ul').getAttribute('id');
    const sinalAbrirFechar = document.querySelector(`#${ulPaiID} .sinal-abir-fechar`);
    
    if(this.checked){
        sinalAbrirFechar.textContent = '+';
        ulPai.style.height = 'auto';
    }else{
        sinalAbrirFechar.textContent = '-';
        ulPai.style.height = '20px';
    }
};


(function(){
    for(let ind = 0; ind < checboxAno.length; ind++){
        checboxAno[ind].addEventListener('change', openCloseYearNav);
    }
    for(let ind = 0; ind < liMeses.length; ind++){
        liMeses[ind].addEventListener('click', MudarMesTabela.selecionaAnoMesClicado)
    }
}());
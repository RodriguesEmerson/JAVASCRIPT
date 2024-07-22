const checboxAno = document.querySelectorAll('input[type=checkbox]');
const liMeses = document.querySelectorAll('.link-mes');

const MudarMesTabela = {
    mesClicado: '' ,
    selecionaMesClicado: function(){
        this.mesClicado = this.getAttribute('value')
        console.log(this.mesClicado);
    },
    selecionaAnoClicado: function(){

    }
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
        liMeses[ind].addEventListener('click', MudarMesTabela.selecionaMesClicado)
    }
}());
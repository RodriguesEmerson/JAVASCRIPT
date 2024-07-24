import { carregaTabelas, criar } from "../script.js";
import { baseDeDados } from "./dados.js";
const navLinks = document.querySelector('.nav-links')

let anoAnteriorSelecionado;
let anoAtivo;
let ano = 2024;
let mes = 'JAN';
export {ano, mes}

const carregaLinksNav = {
    anosEncontrados: [],
    mesesEncontrados: [],
    buscaAnosMeses: function(){
        for (const key in baseDeDados.despesas) {
            //nesse caso não preciso checar se o objeto tem alguma proriedade.
            // if (Object.hasOwnProperty.call(object, key)) { 
                this.anosEncontrados.push(`${key}`);
                for (const chave in baseDeDados.despesas[key]){
                    this.mesesEncontrados.push(`${chave}`)
                }
            // }
        }
        this.carregaLinksNavNoDOM()
    },
    carregaLinksNavNoDOM: function(){
        navLinks.innerHTML = '';
        //Cria <ul> com os anos encontrados;
        this.anosEncontrados.forEach(element => {
            const ulAno = criar('ul');
            ulAno.setAttribute('class', 'nav-link-ano');
            ulAno.setAttribute('id', `A${element}`);
            ulAno.innerHTML = 
                `<li class="link-ano">
                    <input type="checkbox" name="ano" id="ano${element}">
                        <label for="ano${element}">
                            <span class="sinal-abir-fechar">+</span> 
                            ${element}
                            <span></span>
                        </label>
                    </li>`;

            //Cria <ol> com os meses encontrados;
            const olMes = criar('ol');
            olMes.setAttribute('class', 'nav-link-mes');
            ulAno.appendChild(olMes)
            this.mesesEncontrados.forEach(element => {
                const liMes = criar('li')
                liMes.setAttribute('value', `${element}`);
                liMes.setAttribute('class', 'link-mes');
                liMes.textContent = `${this.mesSemAbrev(element )}`
                olMes.appendChild(liMes)
            });

            navLinks.appendChild(ulAno);
        });
        this.addEventsNosLinks();
    },
    mesSemAbrev: function (mes){
        const meses = {
            JAN: 'Janeiro', FEV: 'Fevereiro', MAR: 'Março', ABR: 'Abril',
            MAI: 'Maio', JUN: 'Junho', JUL: 'Julho', AGO: 'Agosto',
            SET: 'Setembro', OUT: 'Outubro', NOV: 'Novembro', DEZ: 'Dezemto'
        }
        //Retorna o mes sem abreviatura;
        for(const key in meses){
            if(`${key}` == mes){
                return meses[key];
            }
        }
    },
    addEventsNosLinks: function(){
        const checboxAno = document.querySelectorAll('input[type=checkbox]');
        const liMeses = document.querySelectorAll('.link-mes');

        for(let ind = 0; ind < checboxAno.length; ind++){
            checboxAno[ind].addEventListener('change', abirFecharLinkAno);
        }
        for(let ind = 0; ind < liMeses.length; ind++){
            liMeses[ind].addEventListener('click', navClick.selecionaAnoMesClicado.bind(navClick, liMeses[ind]))
        }
    }
}


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

function abirFecharLinkAno(){
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


carregaLinksNav.buscaAnosMeses();
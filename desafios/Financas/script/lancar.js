import { baseDeDados, categorias } from './modules/dados.js';
import { carregaLinksNav } from './modules/navigation.js';
import { criar, carregaTabelas } from './main.js';

const form = document.querySelector('.dados-box');
const selectCategorias = document.querySelector('#lancar-categoria');
const formBox = document.querySelector('.lancar-container');
const btnAbrirForm = document.querySelector('#abrir-lancar');
const btnFecharForm = document.querySelector('#fechar-form');
const radiosTipo = document.getElementsByTagName('tipo');
const txtDescricao = document.getElementById('lancar-descricao');
const txtData = document.getElementById('lancar-data');
const txtCategoria = document.getElementById('lancar-categoria');
const txtValor = document.getElementById('lancar-valor');
const confirmaDadoLancado = document.querySelector('.confirma-dado-lancado');
const slideConfirm = document.querySelector('.slide-confirma');
const btnLancar = document.getElementById('lancar')
let categoriasCarregadas = false;

form.addEventListener('submit', event => {
    event.preventDefault();
    novoLancamento.lancarNovoDadoCriado();
});




const abrirForm = {
    tornarFormVisivel: function(){
        formBox.classList.remove('hidden');
        this.carregaCategorias();
        this.preencheDataHoje();
    },
    carregaCategorias: function(){
        if(!categoriasCarregadas){
            categorias[0].forEach(element => {
                const option = criar('option');
                option.setAttribute('value', element);
                option.innerText = element;
                selectCategorias.appendChild(option);
                categoriasCarregadas = true;
            });
        };
    },
    preencheDataHoje: function(){
        txtData.value = new Date()
            .toLocaleDateString('pt-br', {day: '2-digit', month: '2-digit', year: 'numeric'});
    },
    autoAdicionaBarra: function(event){
        if(isNaN(`${event.key}`)) return
        const digits = txtData.value.length
        if(digits == 2 || digits == 5) txtData.value = `${txtData.value}/`
    },
}

const novoLancamento = {
    dadosDoFormulario: '',
    ano: '',
    mes: '',
    lancarNovoDadoCriado: function(){
        if(txtCategoria.value == '*Selecionar*'){
            txtCategoria.classList.add('red')
            return
        }
        this.pegarDadosForm();
        this.pegarMesEAnoData(this.dadosDoFormulario.data);
        this.checaSeExisteNaBD();
        const novoDado = this.criarNovoDado()
        
        baseDeDados[this.ano][this.mes][this.dadosDoFormulario.tipo]
        .push(novoDado);
        
        this.ordernarPorData()
        carregaTabelas.insereDados(this.dadosDoFormulario.tipo)//DOM 
        carregaLinksNav.carregaLinksNavNoDOM(); //navigation.js

        //Animação confirmação de laçamento
        confirmaDadoLancado.classList.add('loader');
        btnLancar.setAttribute('disabled', '');
        setTimeout(() => {
            this.animacaoConfirmLacamento();
        }, 410);
    },
    
    pegarDadosForm: function(){
        const formData = new FormData(form);
        this.dadosDoFormulario = Object.fromEntries(formData);
    },
    
    
    criarNovoDado: function(){
        let ordemDasChaves = ['desc', 'data', 'categoria', 'valor'];
        if (this.dadosDoFormulario.tipo != 'despesas') ordemDasChaves = ['desc', 'data', 'valor'];;
        let novoDado = {};
        ordemDasChaves.forEach(element => {
            novoDado[element] = this.dadosDoFormulario[element];
        });
        novoDado.id = this.radomID(2024, novoDado.data);
        return novoDado;
    },
    
    checaSeExisteNaBD: function(){
        if(!baseDeDados[this.ano]){ //checa se existe o ano na 'badeDeDados'.
            baseDeDados[this.ano] = {}; //Se não existir, cria o objeto do novo ano inserido.
        }
        //checa se existe o mês na 'badeDeDados'.
        if(!baseDeDados[this.ano][this.mes]){ 
            //Se não existir, cria o objeto do novo mês inserido.
            baseDeDados[this.ano][this.mes] = {
                despesas:[],
                receitas:[],
                fixos:[]
            }; 
        }
    },
    
    pegarMesEAnoData: function(data){
        let dataArray = data.split('/')//input dd/mm/aaaa 
        let dataReverse = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}` //==> autput aaaa/mm/dd
        
        this.ano = new Date(dataReverse).toLocaleDateString('pt-br', {year: 'numeric'});
        let mes = new Date(dataReverse).toLocaleDateString('pt-br', {month: 'short'});
        this.mes = mes.slice(0, 3).toUpperCase();
    },
    
    ordernarPorData: function(){
        for (const ano in baseDeDados) {
            for (const mes in baseDeDados[ano]) {
                let objetosOrdenados = [];
                for(const tipo in baseDeDados[ano][mes]){
                    objetosOrdenados = [];
                    for(let ind = 1; ind <= 31; ind++){
                        baseDeDados[ano][mes][tipo].forEach(element =>{
                            const dia = element.data.slice(0,2);
                            if(dia == ind) objetosOrdenados.push(element)
                            })
                    }
                    baseDeDados[ano][mes][tipo] = objetosOrdenados;
                }
            }
        }
    },
    
    radomID: function(ano, data){
        let min = Math.ceil(10);
        let max = Math.floor(1000);
        let id = Math.floor(Math.random() * (max - min) + min);
        let newId = `${ano}${data.replaceAll('/', '')}${id}`;
        return newId;
    },

    animacaoConfirmLacamento: function(){
        confirmaDadoLancado.classList.remove('loader')
        confirmaDadoLancado.classList.add('loader-ok')
        slideConfirm.classList.add('tamp')

        setTimeout(() => {
            confirmaDadoLancado.classList.remove('loader-ok');
            slideConfirm.classList.remove('tamp');
            btnLancar.removeAttribute('disabled')
        }, 1000);
    }
}


//Se não for colocado o '.bind', o this em tonarFormVisil irá se referir ao
//próprio método tonarFormVisil e não ao abrirForm;
btnAbrirForm.addEventListener('click', abrirForm.tornarFormVisivel.bind(abrirForm));

btnFecharForm.addEventListener('click', () => {
    formBox.classList.add('hidden');
});
txtData.addEventListener('keyup', abrirForm.autoAdicionaBarra)


/******PROXIMO PASSOS*********
/ /Validar os dados lançados;
/ /Mudar categorias de acordo o tipo de lançamento selecionado;     
/ /Tamanho máximo e mínimo das td's das tables;                     [x]       
/ /Pegar mês da data para lancar na base de dados de acordo o mês;  [x]
/ /Trasformar essas funções em objetos e métodos;                   [x]
*/

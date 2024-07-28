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
let categoriasCarregadas = false;

form.addEventListener('submit', event => {
    event.preventDefault();
    novoLancamento.lancarNovoDadoCriado();
});




const abrirForm = {
    tornarFormVisivel: function(){
        formBox.classList.remove('hidden');
        this.carregaCategorias();
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
}

const preFormataData = {
    formata: function(event){
        console.log(event.key)
        if(isNaN(`${event.key}`)) return
        console.log(txtData.value.length)
        const digits = txtData.value
        if(digits.length == 2 || digits.length == 4) txtData.value = `${txtData.value}/`
    }
}

const novoLancamento = {
    dadosDoFormulario: '',
    ano: '',
    mes: '',
    lancarNovoDadoCriado: function(){
        this.pegarDadosForm();
        this.pegarMesEAnoData(this.dadosDoFormulario.data);
        this.checaSeExisteNaBD();
        const novoDado = this.criarNovoDado()
        
        baseDeDados[this.ano][this.mes][this.dadosDoFormulario.tipo]
        .push(novoDado);
        
        this.ordernarPorData()
        carregaTabelas.insereDados(this.dadosDoFormulario.tipo)//DOM 
        //Atualiza Navigation
        carregaLinksNav.carregaLinksNavNoDOM(); //navigation.js
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
    }
}


//Se não for colocado o '.bind', o this em tonarFormVisil irá se referir ao
//próprio método tonarFormVisil e não ao abrirForm;
btnAbrirForm.addEventListener('click', abrirForm.tornarFormVisivel.bind(abrirForm));

btnFecharForm.addEventListener('click', () => {
    formBox.classList.add('hidden');
});
txtData.addEventListener('keyup', preFormataData.formata)


/******PROXIMO PASSOS*********
/ /Validar os dados lançados;
/ /Mudar categorias de acordo o tipo de lançamento selecionado;     
/ /Tamanho máximo e mínimo das td's das tables;                     [x]       
/ /Pegar mês da data para lancar na base de dados de acordo o mês;  [x]
/ /Trasformar essas funções em objetos e métodos;                   [x]
*/

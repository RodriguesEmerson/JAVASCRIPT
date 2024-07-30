import { baseDeDados, categorias } from './modules/dados.js';
import { carregaLinksNav, meses } from './navigation.js';
import { criar, carregaTabelas } from './main.js';

const form = document.querySelector('.dados-box');
const selectCategorias = document.querySelector('#lancar-categoria');
const formBox = document.querySelector('.lancar-container');
const btnAbrirForm = document.querySelector('#abrir-lancar');
const btnFecharForm = document.querySelector('#fechar-form');
const radiosTipo = document.getElementsByName('tipo');
const txtDescricao = document.getElementById('lancar-descricao');
const txtData = document.getElementById('lancar-data');
const txtCategoria = document.getElementById('lancar-categoria');
const txtValor = document.getElementById('lancar-valor');
const confirmaDadoLancado = document.querySelector('.confirma-dado-lancado');
const slideConfirm = document.querySelector('.slide-confirma');
const btnLancar = document.getElementById('lancar')

form.addEventListener('submit', event => {
    event.preventDefault();
    novoLancamento.lancarNovoDadoCriado();
});

const abrirForm = {
    tornarFormVisivel: function () {
        formBox.classList.remove('hidden');
        this.carregaCategorias();
        this.preencheDataHoje();
        this.mudarCaregorias();
        txtDescricao.focus();
    },

    carregaCategorias: function (categoriaIndex) {
        if ([undefined, 2].includes(categoriaIndex)){
            categoriaIndex = 0;
        } 

        selectCategorias.innerHTML = '';

        categorias[categoriaIndex].forEach(element => {
            const option = criar('option');
            option.setAttribute('value', element);
            option.innerText = element;

            selectCategorias.appendChild(option);
        });
    },

    preencheDataHoje: function () {
        txtData.value = new Date()
            .toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },

    autoAdicionaBarraData: function () {
        const digits = txtData.value.length
        if (digits == 2 || digits == 5) txtData.value = `${txtData.value}/`
    },

    digits: [],
    autoAdicionaPontoVirgulaValor: function (event) {
        const digit = event.data;
        if (event.inputType == 'deleteContentBackward') {
            if (['0,0', '0,', '0', ''].includes(txtValor.value)) {
                this.digits = [];
                txtValor.value = '0,00';
                return
            }
            this.digits.pop();
        } else {
            if (/[^0-9]/.test(digit)) {
                txtValor.value = txtValor.value.replace(/[a-zA-Z]/g, '');
                return;
            }
            this.digits.push(digit);
            if (this.digits.length > 6) this.digits.pop()
        };
        let digits = this.digits
        if (digits.length == 1) txtValor.value = `0,0${digits[0]}`;
        if (digits.length == 2) txtValor.value = `0,${digits[0]}${digits[1]}`;
        if (digits.length == 3) txtValor.value = `${digits[0]},${digits[1]}${digits[2]}`;
        if (digits.length == 4) txtValor.value = `${digits[0]}${digits[1]},${digits[2]}${digits[3]}`;
        if (digits.length == 5) txtValor.value = `${digits[0]}${digits[1]}${digits[2]},${digits[3]}${digits[4]}`;
        if (digits.length == 6) txtValor.value = `${digits[0]}.${digits[1]}${digits[2]}${digits[3]},${digits[4]}${digits[5]}`;
    },

    mudarCaregorias: function () {
        for (let ind = 0; ind <= 2; ind++) {
            radiosTipo[ind].addEventListener('click', () => {
                this.carregaCategorias(ind);
            });
        }
    },
}

export const novoLancamento = {
    dadosDoFormulario: '',
    ano: '',
    mes: '',
    lancarNovoDadoCriado: function () {
        if (txtCategoria.value == '*Selecionar*') {
            txtCategoria.classList.add('red')
            return
        }
        this.pegarDadosForm();
        this.pegarMesEAnoData(this.dadosDoFormulario.data);
        this.checaSeExisteNaBD();
        const novoDado = this.criarNovoDado()

        baseDeDados[this.ano][this.mes][this.dadosDoFormulario.tipo].push(novoDado);
        console.log('FOI', baseDeDados)
        this.ordenarPeloMes();
        carregaTabelas.insereDados(this.dadosDoFormulario.tipo);//main.js
        carregaLinksNav.carregaLinksNavNoDOM(); //navigation.js

        confirmaDadoLancado.classList.add('loader');
        btnLancar.setAttribute('disabled', '');
        setTimeout(() => {
            this.animacaoConfirmLacamento();
        }, 410);

        this.limparForm();

    },

    pegarDadosForm: function () {
        const formData = new FormData(form);
        this.dadosDoFormulario = Object.fromEntries(formData);
    },

    criarNovoDado: function () {
        let ordemDasChaves = ['desc', 'data', 'categoria', 'valor'];
        if (this.dadosDoFormulario.tipo != 'despesas') ordemDasChaves = ['desc', 'data', 'valor'];;
        let novoDado = {};
        ordemDasChaves.forEach(element => {
            novoDado[element] = this.dadosDoFormulario[element];
        });
        //Input 0.000,00 => Output 0000.00
        novoDado.valor = novoDado.valor.replace(',', '.');
        if (novoDado.valor.length > 6) {
            novoDado.valor = novoDado.valor.replace('.', '');
        }

        novoDado.id = this.radomID(this.ano, novoDado.data);
        return novoDado;
    },

    checaSeExisteNaBD: function () {
        //checa se existe o ano na 'badeDeDados'.
        if (!baseDeDados[this.ano]) {
            //Se não existir, cria o objeto do novo ano inserido.
            baseDeDados[this.ano] = {};
        }
        //checa se existe o mês na 'badeDeDados'.
        if (!baseDeDados[this.ano][this.mes]) {
            //Se não existir, cria o objeto do novo mês inserido.
            baseDeDados[this.ano][this.mes] = {
                despesas: [],
                receitas: [],
                fixos: []
            };
        }
    },

    pegarMesEAnoData: function (data) {
        let dataArray = data.split('/')//input dd/mm/aaaa 
        let dataReverse = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}` //==> autput aaaa/mm/dd

        this.ano = new Date(dataReverse).toLocaleDateString('pt-br', { year: 'numeric' });
        let mes = new Date(dataReverse).toLocaleDateString('pt-br', { month: 'short' });
        this.mes = mes.slice(0, 3).toUpperCase();
    },

    ordenarPeloMes: function(){
        const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 
                       'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
                    ]

        let itensOrdenadosPeloMes = {};
        for(const ano in baseDeDados){
            itensOrdenadosPeloMes = [];
            meses.forEach( mes =>{
                if(baseDeDados[ano][mes]){
                    itensOrdenadosPeloMes[mes] = baseDeDados[ano][mes];
                }
            })
            baseDeDados[ano] = itensOrdenadosPeloMes;
        }
        this.ordenarPeloDia();
    },
    
    ordenarPeloDia: function () {
        for (const ano in baseDeDados) {
            for (const mes in baseDeDados[ano]) {
                let itensOrdenadosPeloDia = [];
                for (const tipo in baseDeDados[ano][mes]) {
                    itensOrdenadosPeloDia = [];
                    for (let ind = 1; ind <= 31; ind++) {
                        baseDeDados[ano][mes][tipo].forEach(element => {
                            const dia = element.data.slice(0, 2);
                            if (dia == ind) itensOrdenadosPeloDia.push(element)
                        })
                    }
                    baseDeDados[ano][mes][tipo] = itensOrdenadosPeloDia;
                }
            }
        }
    },

    radomID: function (ano, data) {
        let min = Math.ceil(10);
        let max = Math.floor(1000);
        let id = Math.floor(Math.random() * (max - min) + min);
        let newId = `${ano}${data.replaceAll('/', '')}${id}`;
        return newId;
    },

    animacaoConfirmLacamento: function () {
        confirmaDadoLancado.classList.remove('loader')
        confirmaDadoLancado.classList.add('loader-ok')
        slideConfirm.classList.add('tamp')

        setTimeout(() => {
            confirmaDadoLancado.classList.remove('loader-ok');
            slideConfirm.classList.remove('tamp');
            btnLancar.removeAttribute('disabled')
        }, 1000);
    },

    limparForm: function () {
        txtDescricao.value = '';
        txtCategoria.value = '*Selecionar*'
        txtValor.value = '';
        abrirForm.digits = [];
        txtDescricao.focus();
    },
}


//Se não for colocado o '.bind', o this em tonarFormVisil irá se referir ao
//próprio método tonarFormVisil e não ao abrirForm;
btnAbrirForm.addEventListener('click', abrirForm.tornarFormVisivel.bind(abrirForm));

btnFecharForm.addEventListener('click', () => {
    formBox.classList.add('hidden');
});
txtData.addEventListener('input', abrirForm.autoAdicionaBarraData);
txtValor.addEventListener('input', abrirForm.autoAdicionaPontoVirgulaValor.bind(abrirForm));



/******PRÓXIMOS PASSOS*********
/ /Validar os dados lançados;                                       [x]
/ /Mudar categorias de acordo o tipo de lançamento selecionado;     [x]
/ /Tamanho máximo e mínimo das td's das tables;                     [x]       
/ /Pegar mês da data para lancar na base de dados de acordo o mês;  [x]
/ /Trasformar essas funções em objetos e métodos;                   [x]
*/

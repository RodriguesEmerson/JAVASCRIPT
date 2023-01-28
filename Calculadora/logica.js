let but_calc = document.querySelector('.but-Soma')
but_calc.addEventListener('click', somaTotal)
const calcula = new Calculadora();

let str = ''
let searchCaracter = ''
let a = '5-3.2' //Usando apenas para testes

function somaTotal(){

    a = tela.textContent

    let regex = /(\.?\d+\.?\d*)(\/|\-|\*|\+)(\.?\d+\.?\d*)/ //Regex Padrao
    
    let regexPadraoMultDiv = /(\.?\d+\.?\d*)(\/|\*)(\.?\d+\.?\d*)/ //padrao para mult e div
    let regexPadraoAdiSub = /(\.?\d+\.?\d*)(\-|\+)(\.?\d+\.?\d*)/ //padrao adi e sub

    let regexVI = /\-|\*|\/|\+/ //Operadores
    let regexMultDiv = /\*|\// //Operadores de Multiplicação e Divisão
    let regexAdiSub = /\-|\+/ //Operadores de Adição e Subtração

    while(regexMultDiv.test(a) == true){ //Verifica se ainda existe algum dos operadores na string

        if(regex.test(a) == true){ //Verifica se exite aqule padrao na string // evita dar loop quando o resultado e
            // neagivo EX: -10
            
            var result = regexPadraoMultDiv.exec(a) //Transforma apenas o padrao que busco 
            //em um arrey ficando no inice [0]
           
            str = result[0] //pega o valor do indice [0] do arrey result

            searchCaracter = (regexVI.exec(str))//Extrai o operador que está
            //dentro do dos números trazidos pelo str

            searchCaracter = searchCaracter.toString() //Transforma aquele operador
            //extraido pelo searchCaracter em uma String, mesmo ja sendo, apenas 
            //para garantir

            str = str.toString()//Transforma os números em string novamente, isso
            //porque quando jogo eles para fazer os calculos, os transformo em 
            //números

            //console.log(`1 é ${searchCaracter.toString()}`)
            sum()
            tela.textContent = a
        
        }else{
            break
        } 
    }
    while(regexAdiSub.test(a) == true){
        
        if(regex.test(a) == true){
           
            var result = regex.exec(a) // Aqui eu poderia colocar a regex regexPadraoAdiSub que
            //não daria diferença, ja que não há mais os outros operadores na string deixei 
            // esse mesmo

            str = result[0]
            searchCaracter = (regexVI.exec(str))

            str = str.toString()
            searchCaracter.toString()
            
            //console.log(searchCaracter.toString())
            sum()
            tela.textContent = a
        }else{
            break
        }
    }
    VerificaNunsLongos()
}

function btnPontoLogica(){

    a = tela.textContent
    let regex2 = /\./
    let lastValue =  /[^0-9]\d*\.?\d*$/ // pera o ultimo valor depois do operador

    if(tela.textContent == '.'){
       if(regex2.exec(tela.textContent)){
        tela.textContent = '.'
        console.log('foi 1')
       }
    }else if(tela.textContent.length == 0){
        tela.textContent = '.'
        console.log('foi 2')
    }

    lastValue = lastValue.exec(a)
    let searchDot = regex2.test(lastValue)

    if(searchDot == true){
        console.log('Já tem ponto no último valor')
    }else{
        tela.textContent = a + '.'
    }
 
}

function VerificaNunsLongos(){
    a = tela.textContent
    let regexNunsLongos = /\d+\.\d{4}/ //Ex 0.1234... ou 10.1234...
    let newResult = regexNunsLongos.exec(a)
    if(regexNunsLongos.test(a) == true){
        tela.textContent = newResult.toString()
    }
   //Esse código, verifica se o resultado final tem mais de 4 números depois
   // do ponto, se tiver, ele retira todos os outros e deixa apenas os 4.
   //EX:
   //Se o número for 10.123456789 ou 0.123456789 ele passará a ser
   // 10.1234 e 0.1234 respectivamente
}



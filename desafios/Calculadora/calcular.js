function sum(){
    let regexFist = /\d*\.?\d+[^0-9]/ //Padrão de números antes do operador

    let NunsFirst = regexFist.exec(str) //Pega todos o números antes do operador nunto com o operador

    let FirstNumberHere = NunsFirst.toString().slice(0,-1) //Retira o ultimo valor de NunsFirst que no caco
    //sempre será o operador, faço isso para poder calcular apenas os valores

    let regexLast = /[^0-9]\d*\.?\d*$/ //Padrão dos números depois do operador
    let NunsLast = regexLast.exec(str) //Pega os últimos números junto com o operador

    if(searchCaracter == '/'){ //Aqui, novamente, verifica qual operador esta sendo trazido, para assim 
        //chamar a função certa, dentro da Class Calculadora. Isso se aplica para todos os else's abaixo.

        let lastNumberHere = NunsLast.toString().replace('/', '') //Retiro o operador do número para poder calcular
        //apenas os números

        let dividir = calcula.dividir(Number(FirstNumberHere), Number(lastNumberHere))//Aqui, pego os primeiros 
        //números antes do operador e os  últimos números depois do operador que estava na string trazida, 
        //e os passo como parâmentros na função dividr da Class Calculadora
        // para assim, ser retornado o resultado do calculo.

        //console.log(FirstNumberHere)
        //console.log(lastNumberHere)
        //console.log(dividir)

        a = a.replace(str, dividir)//Para que o valor do 'a' se atualize, retiro os números que foram calculados
        //e os substituo pelo resultado encontrado

        //**********************************************************//
        //A MESMA LÓGICA SE REPETE PARA TODOS OS OPERADORES ABAIXO!//

        //console.log(a.replace(str, dividir)) //Usei em todos mas apaguei depois que terminei, para diminuir o código,
        // assim como os console.log() acima

    }else if(searchCaracter == '*'){

        let lastNumberHere = NunsLast.toString().replace('*', '')
        let multiplicar = calcula.multiplicar(Number(FirstNumberHere), Number(lastNumberHere))

        a = a.replace(str, multiplicar)

    }else if(searchCaracter == '+'){

        let lastNumberHere = NunsLast.toString().replace('+', '')
        let somar = calcula.somar(Number(FirstNumberHere), Number(lastNumberHere))

        a = a.replace(str, somar)
        
    }else{

        let lastNumberHere = NunsLast.toString().replace('-', '')
        let subtrair = calcula.subtrair(Number(FirstNumberHere), Number(lastNumberHere))

        a = a.replace(str, subtrair)
    }
    
    
  
}   


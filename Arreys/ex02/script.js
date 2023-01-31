let dados = [
    {id: 1, nome: 'Emerson', idade: 22, profissão: 'Fotógrafo', sexo: 'Masculino'}, 
    {id: 2, nome: 'Emerson Rodrigues', idade: 24, profissão: 'Dev', sexo:'Masculino'}, 
]

function filtra(num){
    let b = dados.filter( a => {
        return a.id == num
    })
    return b
}

let test = filtra(2)
//console.log(test)

let totalIdade = dados.reduce((prevVal, currVal) => prevVal + currVal.idade ,0)

//console.log(totalIdade)

let verifica = dados.every(function(v){ //function expression
    return v.idade > 20
})

verifica = dados.every(v => v.idade > 20) //Arrow function

//console.log(verifica)

let verificaSome = dados.some(v => v.idade > 23)

//console.log(verificaSome)

let procura = dados.find(v => v.nome.startsWith('E'))
procura = dados.find(v => v.profissão == 'Dev')
//console.log(procura)

let have = dados.filter(v => v.nome.includes('Rodrigues'))
//console.log(have)

let foi = dados.filter( p => p.sexo == 'Masculino')
console.log(foi)
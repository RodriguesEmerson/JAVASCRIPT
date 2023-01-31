let dados = [
    {id: 1, nome: 'Emerson', idade: 24, profissão: 'Fotógrafo'}, 
    {id: 2, nome: 'Emerson Rodrigues', idade: 24, profissão: 'Dev'}, 
]

function filtra(num){
    let b = dados.filter( a => {
        return a.id == num
    })
    return b
}

let test = filtra(2)
console.log(test)
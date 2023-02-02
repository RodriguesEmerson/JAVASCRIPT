'use strict'
this.nome = "Erika"
this.idade = '22'

function sayName(){
    console.log(this.nome, this.idade)
}
const nn = {
    nome:'Emerson', idade: '24',
}

sayName.call(this)
sayName.call(nn)

//Aula sobre This
//https://www.youtube.com/watch?v=GSqR2i-Pq6o
//Parei nos 20:35
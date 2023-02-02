//'use strict'
let a = {
    nome: "Emerson",
    fc: function(){
        console.log(this.nome)
    }
}
//a.fc()

this.nome = 'Emesron'

function tes(){
    console.log(this.nome)
}
//tes()

let ob = {
    //nome: "Emerson",
    fun: function(){
        console.log(this.nome)
    }
}

//ob.fun()
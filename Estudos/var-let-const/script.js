 var nome = "Emerson"
 const age = {idade: 23}

 const fnc = (arg) =>{
     return arg * 2
 }

 function dig(){
    //var nome = 'Erika'
    nome = 'Erika'
    return nome
 }

 dig()
 console.log(nome)

 age.idade  = 24
 console.log(age)

 let mutiply = fnc(5)
 console.log(mutiply)
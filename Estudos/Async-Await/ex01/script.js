//Sintaxe
// function PriFunc(id){
//     return fetch(`https://reqres.in/api/users?id=${id}`)
//     .then((data) => data.json())
//     .catch((err) => console.log(err))
// }

// async function getUser(id){
//     const user = await PriFunc(id)
    
//     console.log(user)
//     console.log(user.data)
//     console.log(user.data.first_name)
    
// }
// getUser(12)

//Sintaxe
function PriFunc(id){
    return fetch(`https://reqres.in/api/users?id=${id}`)
    .then((data) => data.json()) //Transforma os dados em objetos para o JS
    .catch((err) => console.log(err))// trata erro da promise
}

async function getUser(id){
    try{
        const user = await PriFunc(id)
       
        console.log(user)
        console.log(user.data)
        console.log(user.data.first_name)
    }catch(err){ // trata erro do async
        console.log(`Erro: ${err}`)
    }
    
}
getUser(12)
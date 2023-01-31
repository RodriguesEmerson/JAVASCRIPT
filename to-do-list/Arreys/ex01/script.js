




let numeros = [1,5,7,23,5,1,74]
let test = 3

let multip = numeros.map(function(ed){
    return ed + 4
})

let newFilter =  numeros.filter((v, i, arr) => arr.indexOf(v) == i)


console.log(numeros )
console.log(newFilter)
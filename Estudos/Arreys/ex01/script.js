

let numeros = [1,5,7,23,5,1,74]

let newFilter = numeros.filter(function (v,i,arr){
    if(arr.indexOf(v) == i){
        return v
    }
})
const newFilter2 = numeros.filter((v,i,arr) => {
    return arr.indexOf(v) == i
})

let newFilter3 = numeros.filter((v, i, a) => a.indexOf(v) != i)

let newFilter4 = numeros.filter( v => v > 5)
console.log('Emerson')


function filtra(n){
    return n > 5
}

let newFilter5 = numeros.filter(filtra)

console.log(numeros )
console.log(newFilter)
console.log(newFilter2)
console.log(newFilter3)
console.log(newFilter4)
console.log(newFilter5)



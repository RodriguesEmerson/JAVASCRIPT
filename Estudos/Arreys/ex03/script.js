// let arr = [[11, 2, 4], [4, 5, 6], [10, 8, -12]]
// let str = '234+543'
// arr.push(10)
// console.log(arr)

// arr.pop()
// console.log(arr)

// arr.unshift(0)
// console.log(arr)

// arr.shift()
// console.log(arr)

// console.log(str.split(/[^0-9]/))
// let soma = (str.split(/[^0-9]/))

// let a =(arr.reduce((acc, curr) => acc + curr, 0))
// let b = ['emerson', 'erika']
// console.log(b[arr[0]])
let arr = [[11, 2, 4], [4, 5, 6], [10, 8, -12]]

let acc = 2
let som = 0; let som2 = 0;
for(let i = 0; i < 3; i++){
    som =  som + arr[i][i]

    som2 = som2 + arr[i][acc]
    acc--
}


console.log(som, som2)
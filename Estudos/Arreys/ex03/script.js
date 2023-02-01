let arr = [1,3,4,5,6,7,8,9]
let str = '234+543'
arr.push(10)
console.log(arr)

arr.pop()
console.log(arr)

arr.unshift(0)
console.log(arr)

arr.shift()
console.log(arr)

console.log(str.split(/[^0-9]/))
let soma = (str.split(/[^0-9]/))

console.log(Number(soma[0]) + Number(soma[1]))


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
let arr =[  [11, 2,  4], 
            [4,  5,  6], 
            [10, 8, -12]
         ]

         let x1 = [0,1,2]; let x2 = [2,1,0]
         let result
         let b = 0; let c = 0;
         for(let i = 0; i < 3; i++){
           b = b + arr[x1[i]][i] 
           c = c + arr[x2[i]][i] 
         }
          result = b - c;
    console.log(Math.abs(result))
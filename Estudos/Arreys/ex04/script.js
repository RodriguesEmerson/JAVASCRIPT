
function myFunction(a,b){
    console.log(b.length)
    let count = 0
    for(let i = 0; i < b.length; i++){
        if(b[i] == a){
            count++ 
        } 
    } 
    console.log(count)
    
}
myFunction('m', 'how many times does the character occur in this sentence?')
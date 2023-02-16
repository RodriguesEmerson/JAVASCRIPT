function hangman(hangmanString) {
    let e = 1
    hangmanString = hangmanString.split('')
    for(let i = 0 ; i < hangmanString.length; i++){
        if(e == 1){
            console.log('foi')
            hangmanString[i] = '_'
            e = 2
        }else{
            e = 1
        }
    }
    hangmanString = hangmanString.toString()
    hangmanString = hangmanString.replace(/\,/g, '')
    console.log(hangmanString)
    
}
hangman('TestString')
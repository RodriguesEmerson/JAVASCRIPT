function checkPassword(password, password_repeat) {
    let regMai = /[A-Z]/
    let regMin = /[a-z]/
    let hasNum = /\d/
    let espChars = /\&|\$|\%|\§|\-|\_/
    let quant = ''
    let equal = ''

    if(password.length >= 8) quant = true
    if(password == password_repeat) equal = true
    
    if(regMai.test(password) == true &&
    regMin.test(password == true) &&
    hasNum.test(password) == true &&
    espChars.test(password) == true &&
    quant == true && equal == true){
        console.log('true')
    }else(
        console.log('false')
    )
    
}

checkPassword('omvdsse', 'omvdsse')
checkPassword('HUIFDSJHKSADN', 'HUIFDSJHKSADN')
checkPassword('YY&glk4Hfi_ffS', 'YY&glk4Hfi_ffS')
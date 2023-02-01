//==========================================================//
//                 BRINCANDO COM FUNÇÕES                    //
//==========================================================//

function comprimenta(){
    let hora = new Date().getHours()
   if (hora <= 12 ) return 'Bom dia'
   if (hora > 12 && hora <= 18) return 'Boa tarde'
   return 'Boa noite'
}

function ho(){
    return new Date().getHours()
} 

let hora = (p) => {
    if (p <= 12 ) return 'Bom dia'
    if (p > 12 && p <= 18) return 'Boa tarde'
    return 'Boa noite'
}

let hh = function(){
    let hora = new Date().getHours()
    if (hora <= 12 ) return 'Bom dia'
    if (hora > 12 && hora <= 18) return 'Boa tarde'
    return 'Boa noite'
}

function upper(t){
    t = t.toUpperCase()
    return t
}
function exc(p){
    return `${p}!!!`
}
let a = function(){
    return 3 + 5
}

let exclam = exc(upper(hora(ho())))

//console.log(exclam)
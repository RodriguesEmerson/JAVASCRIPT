
function Calculadora(){

}

Calculadora.prototype.somar = function(n1, n2){
    return n1 + n2;
}

Calculadora.prototype.dividir = function(n1, n2){
    return n1 / n2;
}

Calculadora.prototype.multiplicar = function(n1, n2){
    return n1 * n2;
}
Calculadora.prototype.subtrair = function(n1, n2){
    return n1 - n2;
}


const calcular = new Calculadora();
let resultado = calcular.multiplicar(10, 34);

console.log(resultado)


function Calculadora2(){

}

Calculadora2.prototype = Object.create(Calculadora.prototype);
Calculadora2.prototype.constructor = Calculadora2;

const calcular2 = new Calculadora2();

const result = calcular2.somar(2, 45)

console.log(result)